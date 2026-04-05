import { useMemo, useState } from 'react'
import { initialServices, profileMenu, quickServices, serviceCategories, starterBookings, workerJobs } from './data'

const initialAuth = {
  mode: 'welcome',
  role: '',
  name: '',
  email: '',
  authenticated: false
}

function formatCurrency(value) {
  return `₦${value.toLocaleString()}`
}

function Icon({ name, size = 24, stroke = 2.1, filled = false }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true'
  }

  switch (name) {
    case 'home':
      return <svg {...common}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9 20v-6h6v6"/></svg>
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    case 'user':
      return <svg {...common}><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/></svg>
    case 'sparkle':
      return <svg {...common}><path d="m12 3 1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2L6.5 8.5l4.2-1.3L12 3Z"/><path d="m18 15 .7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7L18 15Z"/></svg>
    case 'shirt':
      return <svg {...common}><path d="m7 6 2-3h6l2 3 4 2-2 4-2-1v10H7V11l-2 1-2-4 4-2Z"/></svg>
    case 'spray':
      return <svg {...common}><path d="M10 8h4"/><path d="M12 8V5"/><path d="M9 10h6l1 10H8l1-10Z"/><path d="M17 6h2"/><path d="M19 4h2"/><path d="M17 8h2"/></svg>
    case 'diamond':
      return <svg {...common}><path d="m4 9 3-4h10l3 4-8 10-8-10Z"/><path d="M9 5 12 19 15 5"/></svg>
    case 'chef':
      return <svg {...common}><path d="M8 20v-6h8v6"/><path d="M7 14h10"/><path d="M7.5 10a4.5 4.5 0 0 1 9 0"/><path d="M6 10a3 3 0 0 1 2-2.8"/><path d="M18 7.2A3 3 0 0 1 20 10"/></svg>
    case 'trash':
      return <svg {...common}><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>
    case 'bag':
      return <svg {...common}><path d="M7 8h10l1 12H6L7 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
    case 'cutlery':
      return <svg {...common}><path d="M4 3v8"/><path d="M7 3v8"/><path d="M4 7h3"/><path d="M6 11v10"/><path d="M14 3v7"/><path d="M18 3v7"/><path d="M16 10v11"/></svg>
    case 'bug':
      return <svg {...common}><path d="M8 9V7a4 4 0 1 1 8 0v2"/><path d="M6 13h12"/><path d="M7 9h10v7a5 5 0 0 1-10 0V9Z"/><path d="m4 8 2 2"/><path d="m20 8-2 2"/><path d="m4 18 2-2"/><path d="m20 18-2-2"/></svg>
    case 'drop':
      return <svg {...common}><path d="M12 3s5 5.1 5 9a5 5 0 0 1-10 0c0-3.9 5-9 5-9Z"/></svg>
    case 'car':
      return <svg {...common}><path d="M5 16h14l-1.5-5h-11L5 16Z"/><path d="M7 16v2"/><path d="M17 16v2"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>
    case 'flower':
      return <svg {...common}><circle cx="12" cy="11" r="2"/><path d="M12 4c1.5 0 2.5 1 2.5 2.5S13.5 9 12 9 9.5 8 9.5 6.5 10.5 4 12 4Z"/><path d="M5 11c0-1.5 1-2.5 2.5-2.5S10 9.5 10 11 9 13.5 7.5 13.5 5 12.5 5 11Z"/><path d="M14 11c0-1.5 1-2.5 2.5-2.5S19 9.5 19 11s-1 2.5-2.5 2.5S14 12.5 14 11Z"/><path d="M12 13v7"/><path d="M9 20h6"/></svg>
    case 'heart':
      if (filled) return <svg {...common} fill="currentColor" stroke="none"><path d="M12 21s-7-4.4-9.2-9A5.6 5.6 0 0 1 12 5.7 5.6 5.6 0 0 1 21.2 12C19 16.6 12 21 12 21Z"/></svg>
      return <svg {...common}><path d="M12 21s-7-4.4-9.2-9A5.6 5.6 0 0 1 12 5.7 5.6 5.6 0 0 1 21.2 12C19 16.6 12 21 12 21Z"/></svg>
    case 'plus':
      return <svg {...common}><path d="M12 5v14"/><path d="M5 12h14"/></svg>
    case 'location':
      return <svg {...common}><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/></svg>
    case 'star':
      return <svg {...common} fill="currentColor" stroke="none"><path d="m12 2.8 2.7 5.5 6 .9-4.3 4.2 1 5.9-5.4-2.9-5.4 2.9 1-5.9L3.3 9.2l6-.9L12 2.8Z"/></svg>
    case 'question':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.7c-.8.7-1.8 1.2-1.8 2.3"/><circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none"/></svg>
    case 'shield':
      return <svg {...common}><path d="M12 3s6 2 6 5v4c0 4.5-3 7-6 9-3-2-6-4.5-6-9V8c0-3 6-5 6-5Z"/></svg>
    case 'tool':
      return <svg {...common}><path d="m14 7 3-3 3 3-3 3"/><path d="M13 8 4 17l3 3 9-9"/><path d="m3 21 4-1"/></svg>
    case 'logout':
      return <svg {...common}><path d="M10 17H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4"/><path d="m14 16 4-4-4-4"/><path d="M18 12H9"/></svg>
    case 'briefcase':
      return <svg {...common}><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/><path d="M4 12h16"/></svg>
    case 'person-check':
      return <svg {...common}><circle cx="9" cy="8" r="3"/><path d="M4 20a5 5 0 0 1 10 0"/><path d="m16 16 2 2 4-4"/></svg>
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8"/></svg>
  }
}

function MobileFrame({ children }) {
  return <div className="page-shell"><div className="mobile-app">{children}</div></div>
}

function AuthScreen({ auth, setAuth }) {
  const [role, setRole] = useState(auth.role || 'customer')
  const [name, setName] = useState(auth.name || '')
  const [email, setEmail] = useState(auth.email || '')

  const submit = (e) => {
    e.preventDefault()
    setAuth({
      mode: 'app',
      role,
      name: name.trim() || (role === 'worker' ? 'Ibrahim M.' : 'Black'),
      email: email.trim() || (role === 'worker' ? 'worker@homehero.app' : 'customer@homehero.app'),
      authenticated: true
    })
  }

  return (
    <main className="auth-screen fade-in-up">
      <div className="auth-logo">HomeHero</div>
      <h1>Clean help, on demand</h1>
      <p>Register as a customer to book services, or as a worker to accept jobs and earn.</p>

      <div className="role-switch">
        <button type="button" className={role === 'customer' ? 'role-btn active' : 'role-btn'} onClick={() => setRole('customer')}>
          <Icon name="user" size={22} />
          Customer
        </button>
        <button type="button" className={role === 'worker' ? 'role-btn active' : 'role-btn'} onClick={() => setRole('worker')}>
          <Icon name="briefcase" size={22} />
          Worker
        </button>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <label>
          <span>Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={role === 'worker' ? 'Ibrahim M.' : 'Black'} />
        </label>
        <label>
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" />
        </label>
        <button type="submit" className="auth-submit">
          Continue as {role === 'worker' ? 'Worker' : 'Customer'}
        </button>
      </form>
    </main>
  )
}

function SectionTitle({ title, action, onAction }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action ? <button className="inline-action" onClick={onAction}>{action}</button> : null}
    </div>
  )
}

function QuickServiceCard({ item, onOpen }) {
  return (
    <button className="quick-card lift" type="button" onClick={() => onOpen(item.category)}>
      <div className="quick-icon"><Icon name={item.icon} size={30} /></div>
      <span>{item.name}</span>
    </button>
  )
}

function ServiceCard({ item, onToggleFavorite, onBook }) {
  return (
    <div className="service-card fade-in-up">
      <div className="service-card-top">
        <div className="service-icon-wrap">
          <Icon name={item.icon} size={30} />
        </div>
        <button className="favorite-btn" onClick={() => onToggleFavorite(item.id)} type="button" aria-label="Toggle favorite">
          <Icon name="heart" size={28} filled={item.favorite} />
        </button>
      </div>

      <h3>{item.name}</h3>
      <p>{item.description}</p>

      <div className="service-meta">
        <strong>{formatCurrency(item.price)}</strong>
        <span><Icon name="clock" size={18} stroke={2} /> {item.duration}</span>
      </div>

      <button className="book-btn" type="button" onClick={() => onBook(item)}>
        Book service
      </button>
    </div>
  )
}

function BookingCard({ booking }) {
  const badgeClass =
    booking.badge === 'Confirmed'
      ? 'badge confirmed'
      : booking.badge === 'Completed'
      ? 'badge completed'
      : 'badge cancelled'

  return (
    <div className="booking-card fade-in-up">
      <div className="booking-header">
        <h3>{booking.title}</h3>
        <span className={badgeClass}>{booking.badge}</span>
      </div>

      <div className="booking-helper">
        <div className="avatar">{booking.helper.charAt(0)}</div>
        <span>{booking.helper}</span>
        <span className="rating"><Icon name="star" size={18} /> {booking.rating}</span>
      </div>

      <div className="booking-subrow">
        <span><Icon name="location" size={17} /> {booking.location}</span>
        <span><Icon name="clock" size={17} /> {booking.date}</span>
      </div>

      <div className="booking-divider" />
      <strong className="booking-price">{formatCurrency(booking.price)}</strong>
    </div>
  )
}

function ProfileMenuItem({ item, count, onWorker }) {
  const handleClick = () => {
    if (item.id === 'worker') onWorker()
  }

  return (
    <button className="profile-item" type="button" onClick={handleClick}>
      <div className="profile-item-left">
        <span className="profile-item-icon"><Icon name={item.icon} size={26} /></span>
        <span>{item.label}</span>
      </div>

      <div className="profile-item-right">
        {item.count ? <span className="count-text">{count}</span> : null}
        <span className="chevron">›</span>
      </div>
    </button>
  )
}

function WorkerDashboard({ jobs, acceptedJobs, onAcceptJob }) {
  return (
    <main className="screen worker-screen">
      <div className="worker-header">
        <div>
          <p className="worker-tag">Worker Dashboard</p>
          <h1 className="page-heading">Available Jobs</h1>
        </div>
        <div className="worker-chip">
          <Icon name="person-check" size={18} />
          {acceptedJobs.length} accepted
        </div>
      </div>

      <div className="worker-list">
        {jobs.map((job) => {
          const accepted = acceptedJobs.some((item) => item.id === job.id)
          return (
            <div key={job.id} className="worker-job fade-in-up">
              <div>
                <h3>{job.title}</h3>
                <p>{job.location} • {job.time}</p>
              </div>
              <div className="worker-job-bottom">
                <strong>{formatCurrency(job.payout)}</strong>
                <button type="button" className={accepted ? 'accepted-btn' : 'accept-btn'} onClick={() => onAcceptJob(job)} disabled={accepted}>
                  {accepted ? 'Accepted' : 'Accept Job'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default function App() {
  const [auth, setAuth] = useState(initialAuth)
  const [screen, setScreen] = useState('home')
  const [services, setServices] = useState(initialServices)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [bookingTab, setBookingTab] = useState('Active')
  const [bookings, setBookings] = useState(starterBookings)
  const [acceptedJobs, setAcceptedJobs] = useState([])

  const favoriteCount = useMemo(
    () => services.filter((item) => item.favorite).length,
    [services]
  )

  const spent = useMemo(
    () => bookings.filter((item) => item.badge !== 'Cancelled').reduce((sum, item) => sum + item.price, 0),
    [bookings]
  )

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const term = search.trim().toLowerCase()
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)

      return matchesCategory && matchesSearch
    })
  }, [services, search, category])

  const filteredBookings = useMemo(
    () => bookings.filter((booking) => booking.status === bookingTab),
    [bookings, bookingTab]
  )

  const activeBooking = bookings.find((item) => item.status === 'Active')

  const toggleFavorite = (id) => {
    setServices((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    )
  }

  const goToServices = (categoryName = 'All') => {
    setCategory(categoryName)
    setScreen('services')
  }

  const bookService = (service) => {
    const newBooking = {
      id: Date.now(),
      status: 'Active',
      title: service.name,
      helper: 'Ibrahim M.',
      rating: 4.8,
      location: 'Lagos ...',
      date: 'Today',
      price: service.price,
      badge: 'Confirmed'
    }
    setBookings((prev) => [newBooking, ...prev])
    setScreen('bookings')
    setBookingTab('Active')
  }

  const acceptJob = (job) => {
    if (acceptedJobs.some((item) => item.id === job.id)) return
    setAcceptedJobs((prev) => [job, ...prev])
  }

  const handleSignOut = () => {
    setAuth(initialAuth)
    setScreen('home')
    setSearch('')
    setCategory('All')
    setBookingTab('Active')
  }

  if (!auth.authenticated) {
    return (
      <MobileFrame>
        <AuthScreen auth={auth} setAuth={setAuth} />
      </MobileFrame>
    )
  }

  if (auth.role === 'worker') {
    return (
      <MobileFrame>
        <div className="status-pad" />
        <WorkerDashboard jobs={workerJobs} acceptedJobs={acceptedJobs} onAcceptJob={acceptJob} />
        <nav className="bottom-nav">
          <button type="button" className="nav-item active"><Icon name="briefcase" size={28} /><span>Jobs</span></button>
          <button type="button" className="nav-item" onClick={handleSignOut}><Icon name="logout" size={28} /><span>Sign Out</span></button>
        </nav>
      </MobileFrame>
    )
  }

  return (
    <MobileFrame>
      <div className="status-pad" />

      {screen === 'home' && (
        <main className="screen home-screen">
          <div className="top-copy fade-in-up">
            <p>Relax, we've got your chores covered</p>
            <div className="welcome-row">
              <h1>Good Evening, {auth.name || 'Black'}</h1>
              <button className="sparkle-btn lift" type="button">
                <Icon name="sparkle" size={26} />
              </button>
            </div>
          </div>

          <SectionTitle title="Active Now" />

          {activeBooking ? (
            <div className="active-card fade-in-up">
              <div className="active-card-header">
                <h3>{activeBooking.title}</h3>
                <span className="badge confirmed small">confirmed</span>
              </div>

              <p className="helper-name">Helper: {activeBooking.helper}</p>

              <div className="active-meta">
                <span><Icon name="location" size={16} /> Lagos ...</span>
                <span><Icon name="clock" size={16} /> ASAP</span>
              </div>

              <button className="track-btn" type="button" onClick={() => setScreen('bookings')}>Track →</button>
            </div>
          ) : null}

          <SectionTitle title="Quick Services" action="See all" onAction={() => goToServices('All')} />

          <div className="quick-grid">
            {quickServices.map((item) => (
              <QuickServiceCard key={item.id} item={item} onOpen={goToServices} />
            ))}
          </div>

          <div className="offer-card fade-in-up">
            <div className="offer-tag">🎁 &nbsp; SPECIAL OFFER</div>
            <h3>20% off your first Deep Cleaning</h3>
            <button className="offer-btn" type="button" onClick={() => goToServices('Cleaning')}>Book now <span>›</span></button>
          </div>
        </main>
      )}

      {screen === 'services' && (
        <main className="screen services-screen">
          <h1 className="page-heading fade-in-up">Services</h1>

          <div className="search-wrap fade-in-up">
            <Icon name="search" size={24} />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-row">
            {serviceCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={`pill-btn ${category === item ? 'active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="services-grid">
            {filteredServices.map((item) => (
              <ServiceCard
                key={item.id}
                item={item}
                onToggleFavorite={toggleFavorite}
                onBook={bookService}
              />
            ))}
          </div>
        </main>
      )}

      {screen === 'bookings' && (
        <main className="screen bookings-screen">
          <h1 className="page-heading fade-in-up">My Bookings</h1>

          <div className="tab-switch fade-in-up">
            {['Active', 'Past', 'Cancelled'].map((item) => (
              <button
                key={item}
                type="button"
                className={`tab-btn ${bookingTab === item ? 'active' : ''}`}
                onClick={() => setBookingTab(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="booking-list">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </main>
      )}

      {screen === 'profile' && (
        <main className="screen profile-screen">
          <div className="profile-top fade-in-up">
            <div className="profile-avatar">{auth.name?.charAt(0) || 'B'}</div>
            <div>
              <h1 className="profile-name">{auth.name || 'Black Boy Merch'}</h1>
              <p className="profile-email">{auth.email || 'blackboymerch@gmail.com'}</p>
            </div>
          </div>

          <div className="stat-box-row">
            <div className="mini-stat lift">
              <strong>{bookings.filter((item) => item.badge !== 'Cancelled').length}</strong>
              <span>Bookings</span>
            </div>
            <div className="mini-stat lift">
              <strong>{spent >= 1000 ? `₦${Math.round(spent / 1000)}k` : formatCurrency(spent)}</strong>
              <span>Spent</span>
            </div>
            <div className="mini-stat lift">
              <strong>{favoriteCount}</strong>
              <span>Favorites</span>
            </div>
          </div>

          <div className="saved-header">
            <h2>Saved Addresses</h2>
            <button className="inline-add" type="button"><Icon name="plus" size={18} /> Add</button>
          </div>

          <div className="profile-menu">
            {profileMenu.map((item) => (
              <ProfileMenuItem
                key={item.id}
                item={item}
                count={item.id === 'favorites' ? favoriteCount : 0}
                onWorker={() => setAuth((prev) => ({ ...prev, role: 'worker' }))}
              />
            ))}
          </div>

          <button className="signout-btn" type="button" onClick={handleSignOut}>
            <Icon name="logout" size={22} />
            <span>Sign Out</span>
          </button>
        </main>
      )}

      <nav className="bottom-nav">
        <button
          type="button"
          className={`nav-item ${screen === 'home' ? 'active' : ''}`}
          onClick={() => setScreen('home')}
        >
          <Icon name="home" size={28} />
          <span>Home</span>
        </button>

        <button
          type="button"
          className={`nav-item ${screen === 'services' ? 'active' : ''}`}
          onClick={() => setScreen('services')}
        >
          <Icon name="search" size={28} />
          <span>Services</span>
        </button>

        <button
          type="button"
          className={`nav-item ${screen === 'bookings' ? 'active' : ''}`}
          onClick={() => setScreen('bookings')}
        >
          <Icon name="clock" size={28} />
          <span>Bookings</span>
        </button>

        <button
          type="button"
          className={`nav-item ${screen === 'profile' ? 'active' : ''}`}
          onClick={() => setScreen('profile')}
        >
          <Icon name="user" size={28} />
          <span>Profile</span>
        </button>
      </nav>
    </MobileFrame>
  )
}
