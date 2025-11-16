import React, { useEffect, useRef, useState } from 'react'
import refreshIcon from '../../contacts/refresh-icon.png'
import phoneIcon from '../../contacts/phone-icon.png'
import chatIcon from '../../contacts/chat-icon.png'
import mapIcon from '../../map.png'

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
  const [panelOpen, setPanelOpen] = useState(true)
  const dragStartYRef = useRef<number | null>(null)

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

  const handleRefresh = () => {
    const google = (window as any).google
    // Clear route, destination marker, and nearest state
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setDirections({ routes: [] })
    }
    if (destMarkerRef.current) {
      destMarkerRef.current.setMap(null)
      destMarkerRef.current = null
    }
    setNearestBlueLight(null)
    setError(null)

    // Recenter map to current/initial user location or fetch again
    if (map) {
      if (userLocation) {
        map.setCenter(userLocation)
        map.setZoom(18)
        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null)
        }
        userMarkerRef.current = new google.maps.Marker({
          position: userLocation,
          map,
          title: 'Your location',
        })
      } else if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const center = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            setUserLocation(center)
            map.setCenter(center)
            map.setZoom(18)
            if (userMarkerRef.current) {
              userMarkerRef.current.setMap(null)
            }
            userMarkerRef.current = new google.maps.Marker({
              position: center,
              map,
              title: 'Your location',
            })
          },
          () => {
            setError('Unable to refresh location. Please check permissions.')
          },
          { enableHighAccuracy: true }
        )
      }
    }
  }

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

  // Drag helpers for the route panel
  const onDragMove = (e: MouseEvent) => {
    if (dragStartYRef.current == null) return
    const delta = e.clientY - dragStartYRef.current
    if (delta > 60) {
      setPanelOpen(false)
    } else if (delta < -60) {
      setPanelOpen(true)
    }
  }
  const onDragEnd = () => {
    dragStartYRef.current = null
    window.removeEventListener('mousemove', onDragMove)
  }
  const onDragMoveTouch = (e: TouchEvent) => {
    if (dragStartYRef.current == null) return
    const y = e.touches[0]?.clientY ?? 0
    const delta = y - dragStartYRef.current
    if (delta > 60) {
      setPanelOpen(false)
    } else if (delta < -60) {
      setPanelOpen(true)
    }
  }
  const onDragEndTouch = () => {
    dragStartYRef.current = null
    window.removeEventListener('touchmove', onDragMoveTouch)
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
      {/* Refresh button to reset map state */}
      <button
        className="pointer-events-auto absolute left-4 top-20 z-10 grid place-items-center h-14 w-14 rounded-full border border-[#D6E8FF] bg-[#D6E8FF] text-[#1E3679] shadow-lg shadow-slate-900 hover:shadow-xl transition"
        onClick={handleRefresh}
        aria-label="Refresh map"
        title="Refresh"
      >
        <img src={refreshIcon} alt="Refresh" className="h-8 w-9" draggable={false} />
      </button>

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
            'pointer-events-auto h-16 w-16 rounded-full bg-[#D6E8FF] shadow-lg flex items-center justify-center hover:shadow-xl active:scale-[0.98] transition';
          // Replaced inline SVGs with PNG icons for visual consistency
          return (
            <>
              {/* Chat / Message (Apple-like outline) */}
              <button className={btnCls} onClick={onOpenChat} aria-label="Open chat">
                <img src={chatIcon} alt="Chat" className="h-10 w-10" draggable={false} />
              </button>

              {/* Phone handset (Apple-like outline) */}
              <button className={btnCls} onClick={onOpenContacts} aria-label="Open police contacts">
                <img src={phoneIcon} alt="Phone" className="h-10 w-10" draggable={false} />
              </button>
            </>
          )
        })()}
      </div>

      {/* Bottom CTA / Route panel over the map */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 space-y-3">
        {error && (
          <div className="pointer-events-auto rounded-full bg-black/60 text-xs text-red-200 px-4 py-2 text-center">
            {error}
          </div>
        )}

        {!nearestBlueLight && (
          <div className="pointer-events-auto flex justify-center mb-10">
            <button
              className="w-[88%] max-w-[580px] rounded-full bg-[#7b8fc5] text-white font-semibold text-lg py-4 flex items-center justify-center gap-3 shadow-[0_18px_36px_rgba(15,23,42,0.7)] disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleFindNearest}
              disabled={isFinding || !userLocation}
            >
              <span className="leading-none text-2xl md:text-3xl">{isFinding ? 'Finding Blue Lite…' : 'Find Nearest Blue Lite'}</span>
              <span className="ml-2 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-9 w-9">
                  {/* White pin with blue dot (Apple‑like) */}
                  <path d="M12 2c-3.9 0-7 3.1-7 7 0 5 7 12 7 12s7-7 7-12c0-3.9-3.1-7-7-7z" fill="#e8f0ff"/>
                  <circle cx="12" cy="9" r="2.2" fill="#2647a4"/>
                </svg>
              </span>
            </button>
          </div>
        )}

        {nearestBlueLight && (
          <div
            className="pointer-events-auto rounded-t-2xl bg-slate-50/95 text-slate-900 px-5 py-6 shadow-[0_20px_50px_rgba(15,23,42,0.95)] transition-transform duration-250 ease-out"
            style={{
              transform: panelOpen ? 'translateY(0%)' : 'translateY(60%)',
            }}
          >
            <div className="flex flex-col min-h-[230px] justify-between">
            <div
              className="mb-3 h-1.5 w-16 mx-auto rounded-full bg-slate-300 cursor-pointer"
              onMouseDown={(e) => {
                dragStartYRef.current = e.clientY
                window.addEventListener('mousemove', onDragMove)
                window.addEventListener('mouseup', onDragEnd, { once: true })
              }}
              onTouchStart={(e) => {
                dragStartYRef.current = e.touches[0]?.clientY ?? null
                window.addEventListener('touchmove', onDragMoveTouch, { passive: false })
                window.addEventListener('touchend', onDragEndTouch, { once: true })
              }}
              onClick={() => setPanelOpen((v) => !v)}
              title="Drag to expand/collapse"
            />
              <div className="mb-2 text-xl md:text-2xl font-semibold text-slate-700">
                Route to <span className="text-[#132a6b]">{nearestBlueLight.name}</span>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                <button
                  className="w-full rounded-full bg-[#132a6b] text-slate-50 font-semibold py-4 text-2xl md:text-3xl flex items-center justify-center gap-2"
                  onClick={() => drawRouteToBlueLight(nearestBlueLight)}
                >
                  <span>Start Route</span>
                  <span>▶</span>
                </button>
                <button
                  className="w-full rounded-full bg-[#3E6888] text-slate-50 font-semibold py-4 text-2xl md:text-3xl flex items-center justify-center gap-2"
                  onClick={handleOpenInGoogleMaps}
                >
                  <span>Open in Google Maps</span>
                  <img src={mapIcon} alt="Map" className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pull-up tab when panel is collapsed */}
      {nearestBlueLight && !panelOpen && (
        <button
          className="pointer-events-auto fixed bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-50/90 text-slate-800 px-3 py-1 shadow-md"
          onClick={() => setPanelOpen(true)}
          aria-label="Expand route panel"
          title="Expand"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 14 12 8 18 14"></polyline>
          </svg>
        </button>
      )}

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


