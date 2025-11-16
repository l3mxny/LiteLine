import React, { useEffect, useRef, useState } from 'react'

type Location = { lat: number; lng: number }

type MapPageProps = {
  onOpenChat: () => void
  onOpenContacts: () => void
}

type BlueLight = {
  latitude: number
  longitude: number
  name: string
  googleMapsUrl?: string
}

const API_BASE_URL = 'http://localhost:3000'

const MapPage: React.FC<MapPageProps> = ({ onOpenChat, onOpenContacts }) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const userMarkerRef = useRef<any | null>(null)
  const destMarkerRef = useRef<any | null>(null)
  const directionsServiceRef = useRef<any | null>(null)
  const directionsRendererRef = useRef<any | null>(null)

  const [map, setMap] = useState<any | null>(null)
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [nearestBlueLight, setNearestBlueLight] = useState<BlueLight | null>(null)
  const [isFinding, setIsFinding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTestCoords, setShowTestCoords] = useState(false)
  const [testLat, setTestLat] = useState('')
  const [testLng, setTestLng] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!(window as any).google || !mapRef.current || map) return

    // Google Maps dark style (lightweight preset)
    const darkStyle = [
      { elementType: 'geometry', stylers: [{ color: '#1f2937' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#1f2937' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#e5e7eb' }] },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#c7d2fe' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#0b2537' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#0b1b2b' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#334155' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#cbd5e1' }],
      },
    ]

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const center = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setUserLocation(center)

        const m = new (window as any).google.maps.Map(mapRef.current!, {
          zoom: 18,
          center,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          styles: darkStyle,
        })

        setMap(m)

        userMarkerRef.current = new (window as any).google.maps.Marker({
          position: center,
          map: m,
          title: 'Your location',
        })
      },
      (err) => {
        console.error('Error getting location', err)
        setError('Unable to get your location. Please check permissions.')
      },
      { enableHighAccuracy: true }
    )
  }, [map])

  const setTestLocationOnMap = () => {
    const lat = parseFloat(testLat)
    const lng = parseFloat(testLng)
    if (Number.isNaN(lat) || Number.isNaN(lng) || !map) {
      setError('Enter valid test coordinates.')
      return
    }

    const newLoc = { lat, lng }
    setUserLocation(newLoc)
    setNearestBlueLight(null)
    setError(null)

    const google = (window as any).google

    map.setCenter(newLoc)
    map.setZoom(18)

    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null)
    }

    userMarkerRef.current = new google.maps.Marker({
      position: newLoc,
      map,
      title: 'Test location',
    })

    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({ routes: [] })
    }
  }

  const drawRouteToBlueLight = async (blueLight: BlueLight) => {
    if (!map || !userLocation || !(window as any).google) return

    const google = (window as any).google

    if (!directionsServiceRef.current) {
      directionsServiceRef.current = new google.maps.DirectionsService()
    }
    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#60a5fa',
          strokeOpacity: 1,
          strokeWeight: 5,
        },
      })
    }

    const origin = { lat: userLocation.lat, lng: userLocation.lng }
    const destination = { lat: blueLight.latitude, lng: blueLight.longitude }

    directionsServiceRef.current.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result: any, status: string) => {
        if (status === 'OK' && result) {
          directionsRendererRef.current.setDirections(result)

          // destination marker
          if (destMarkerRef.current) {
            destMarkerRef.current.setMap(null)
          }
          destMarkerRef.current = new google.maps.Marker({
            position: destination,
            map,
            title: blueLight.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 9,
              fillColor: '#38bdf8',
              fillOpacity: 1,
              strokeColor: '#0f172a',
              strokeWeight: 3,
            },
          })

          // ensure user marker exists
          if (!userMarkerRef.current) {
            userMarkerRef.current = new google.maps.Marker({
              position: origin,
              map,
              title: 'Your location',
            })
          }

          // Fit bounds to route
          const bounds = new google.maps.LatLngBounds()
          bounds.extend(origin)
          bounds.extend(destination)
          map.fitBounds(bounds)
        } else {
          console.error('Directions request failed:', status)
          setError('Unable to calculate walking route. Please try again.')
        }
      }
    )
  }

  const handleFindNearest = async () => {
    if (!userLocation) {
      setError('Waiting for your location...')
      return
    }

    setIsFinding(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/safety/nearest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: { lat: userLocation.lat, lng: userLocation.lng },
          options: { limit: 1 },
        }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      const first = data?.blueLights?.[0] as BlueLight | undefined

      if (!first) {
        setError('No blue lites found nearby.')
        return
      }

      setNearestBlueLight(first)
      await drawRouteToBlueLight(first)
    } catch (e) {
      console.error(e)
      setError('Error finding nearest blue lite. Make sure the backend is running.')
    } finally {
      setIsFinding(false)
    }
  }

  const handleOpenInGoogleMaps = () => {
    if (!nearestBlueLight) return

    const url =
      nearestBlueLight.googleMapsUrl ||
      `https://www.google.com/maps/dir/?api=1&destination=${nearestBlueLight.latitude},${nearestBlueLight.longitude}&travelmode=walking`

    window.open(url, '_blank')
  }

  return (
    <main className="relative min-h-screen bg-[#020b25] text-slate-100">
      {/* Full-screen map as background */}
      <div
        ref={mapRef}
        className="absolute inset-0 bg-[#020617]"
      />

      {/* Top-right floating actions (chat + call) */}
      <div className="pointer-events-none absolute right-6 top-10 flex flex-col gap-4">
        {(() => {
          // Solid light-blue circular buttons (non-transparent), crisp icons
          const btnCls =
            'pointer-events-auto h-16 w-16 rounded-full bg-[#cfe0f5] shadow-lg flex items-center justify-center hover:shadow-xl active:scale-[0.98] transition';
          const iconCls = 'h-7 w-7 text-slate-900';
          return (
            <>
              {/* Chat / Message (Apple-like outline) */}
              <button className={btnCls} onClick={onOpenChat} aria-label="Open chat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={iconCls}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6.75 6.75h10.5A2.25 2.25 0 0 1 19.5 9v5.25A2.25 2.25 0 0 1 17.25 16.5H12l-3 2.25V16.5H6.75A2.25 2.25 0 0 1 4.5 14.25V9a2.25 2.25 0 0 1 2.25-2.25z" />
                </svg>
              </button>

              {/* Phone handset (Apple-like outline) */}
              <button className={btnCls} onClick={onOpenContacts} aria-label="Open police contacts">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={iconCls}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15.2 16.1c.7.2 1.3.5 1.9.9.4.3.5.9.3 1.3l-.5.9c-.3.6-1 .9-1.7.8-2.6-.2-5.4-1.6-7.8-4.1S3 10.6 2.8 8c-.1-.7.2-1.4.8-1.7l.9-.5c.4-.2 1 0 1.3.3.4.6.7 1.2.9 1.9.1.3 0 .7-.2.9l-1.1 1.1c.7 1.5 1.8 2.9 3.1 4.2 1.3 1.3 2.7 2.4 4.2 3.1l1.1-1.1c.2-.2.6-.3.9-.2z" />
                </svg>
              </button>
            </>
          )
        })()}
      </div>

      {/* Bottom CTA / Route panel over the map */}
      <div className="pointer-events-none absolute inset-x-6 bottom-8 space-y-3">
        {error && (
          <div className="pointer-events-auto rounded-full bg-black/60 text-xs text-red-200 px-4 py-2 text-center">
            {error}
          </div>
        )}

        {!nearestBlueLight && (
          <button
            className="pointer-events-auto w-full rounded-full bg-[#7b8fc5] text-white font-semibold text-lg py-4 flex items-center justify-center gap-3 shadow-[0_18px_36px_rgba(15,23,42,0.7)] disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleFindNearest}
            disabled={isFinding || !userLocation}
          >
            <span className="leading-none">{isFinding ? 'Finding Blue Lite…' : 'Find Nearest Blue Lite'}</span>
            <span className="ml-2 inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
                {/* White pin with blue dot (Apple‑like) */}
                <path d="M12 2c-3.9 0-7 3.1-7 7 0 5 7 12 7 12s7-7 7-12c0-3.9-3.1-7-7-7z" fill="#e8f0ff"/>
                <circle cx="12" cy="9" r="2.2" fill="#2647a4"/>
              </svg>
            </span>
          </button>
        )}

        {nearestBlueLight && (
          <div className="pointer-events-auto rounded-[1.75rem] bg-slate-50/95 text-slate-900 px-4 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.95)]">
            <div className="mb-3 h-1 w-16 mx-auto rounded-full bg-slate-300" />
            <div className="mb-4 text-sm font-semibold text-slate-700">
              Route to <span className="text-[#132a6b]">{nearestBlueLight.name}</span>
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="w-full rounded-full bg-[#132a6b] text-slate-50 font-semibold py-3 flex items-center justify-center gap-2"
                onClick={() => drawRouteToBlueLight(nearestBlueLight)}
              >
                <span>Start Route</span>
                <span>▶</span>
              </button>
              <button
                className="w-full rounded-full bg-slate-200 text-slate-900 font-semibold py-3 flex items-center justify-center gap-2"
                onClick={handleOpenInGoogleMaps}
              >
                <span>Open in Google Maps</span>
                <span>🗺️</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Small dev-only test coordinates panel */}
      <div className="pointer-events-none absolute left-4 bottom-8">
        <button
          className="pointer-events-auto mb-2 rounded-full bg-black/60 text-[10px] px-3 py-1 text-slate-100"
          onClick={() => setShowTestCoords((v) => !v)}
        >
          Test coords
        </button>
        {showTestCoords && (
          <div className="pointer-events-auto rounded-2xl bg-black/70 p-3 space-y-2 text-[10px] text-slate-100 w-44">
            <div className="space-y-1">
              <input
                className="w-full rounded-md bg-slate-900/70 border border-slate-600 px-2 py-1 text-[10px] outline-none"
                placeholder="Lat"
                value={testLat}
                onChange={(e) => setTestLat(e.target.value)}
              />
              <input
                className="w-full rounded-md bg-slate-900/70 border border-slate-600 px-2 py-1 text-[10px] outline-none"
                placeholder="Lng"
                value={testLng}
                onChange={(e) => setTestLng(e.target.value)}
              />
            </div>
            <button
              className="w-full rounded-md bg-slate-100 text-slate-900 font-semibold py-1"
              onClick={setTestLocationOnMap}
            >
              Set test location
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default MapPage


