import './style.css'

// ===== DOM Elements =====
const loader = document.getElementById('loader')
const nav = document.querySelector('.nav')
const scrollRevealElements = document.querySelectorAll('.scroll-reveal')

// ===== Loading Animation =====
function initLoader() {
  document.body.classList.add('loading')

  // Hide loader after animation completes
  setTimeout(() => {
    loader.classList.add('hidden')
    document.body.classList.remove('loading')

    // Trigger hero animations after loader hides
    setTimeout(() => {
      document.querySelectorAll('.reveal-up').forEach(el => {
        el.style.animationPlayState = 'running'
      })
    }, 100)
  }, 1800)
}

// ===== Navigation Scroll Effect =====
function initNavScroll() {
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY

    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
      nav.classList.add('scrolled')
    } else {
      nav.classList.remove('scrolled')
    }

    lastScroll = currentScroll
  })
}

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on element's position in its container
        const siblings = entry.target.parentElement.querySelectorAll('.scroll-reveal')
        const siblingIndex = Array.from(siblings).indexOf(entry.target)

        setTimeout(() => {
          entry.target.classList.add('visible')
        }, siblingIndex * 100)

        // Stop observing after animation
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  scrollRevealElements.forEach(el => {
    observer.observe(el)
  })
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))

      if (target) {
        const headerOffset = 100
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    })
  })
}

// ===== Magnetic Button Effect =====
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn')

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
    })

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)'
    })
  })
}

// ===== Service Cards Stagger Animation =====
function initServiceCardsAnimation() {
  const serviceCards = document.querySelectorAll('.service-card')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const cards = entry.target.parentElement.querySelectorAll('.service-card')
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('visible')
          }, i * 100)
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  if (serviceCards.length > 0) {
    observer.observe(serviceCards[0])
  }
}

// ===== Service Cards Background Images =====
function initServiceCardBg() {
  const serviceCards = document.querySelectorAll('.service-card[data-bg]')

  serviceCards.forEach(card => {
    const bgUrl = card.getAttribute('data-bg')
    const bgElement = card.querySelector('.service-bg')

    if (bgElement && bgUrl) {
      bgElement.style.backgroundImage = `url(${bgUrl})`
    }
  })
}

// ===== Service Cards Auto Cycle =====
function initServiceCardsCycle() {
  const serviceCards = document.querySelectorAll('.service-card')
  let currentIndex = 0
  let cycleInterval = null

  function activateCard(index) {
    // Remove active class from all cards
    serviceCards.forEach(card => card.classList.remove('active'))
    // Add active class to current card
    serviceCards[index].classList.add('active')
  }

  function startCycle() {
    // Activate first card immediately
    activateCard(currentIndex)

    // Cycle through cards every 2 seconds
    cycleInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % serviceCards.length
      activateCard(currentIndex)
    }, 2000)
  }

  // Start cycling when services section is in view
  const servicesSection = document.getElementById('services')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCycle()
      } else {
        // Stop cycling when out of view
        if (cycleInterval) {
          clearInterval(cycleInterval)
          cycleInterval = null
        }
        // Remove active class from all
        serviceCards.forEach(card => card.classList.remove('active'))
        currentIndex = 0
      }
    })
  }, { threshold: 0.2 })

  if (servicesSection) {
    observer.observe(servicesSection)
  }
}

// ===== Work Items Hover Effect =====
function initWorkItemsEffect() {
  const workItems = document.querySelectorAll('.work-item')

  workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      workItems.forEach(other => {
        if (other !== item) {
          other.style.opacity = '0.5'
        }
      })
    })

    item.addEventListener('mouseleave', () => {
      workItems.forEach(other => {
        other.style.opacity = '1'
      })
    })
  })
}

// ===== Parallax Effect for Hero =====
function initParallax() {
  const hero = document.querySelector('.hero')
  const heroContent = document.querySelector('.hero-content')

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    const heroHeight = hero.offsetHeight

    if (scrolled < heroHeight) {
      const opacity = 1 - (scrolled / heroHeight) * 0.5
      const translateY = scrolled * 0.3

      heroContent.style.opacity = opacity
      heroContent.style.transform = `translateY(${translateY}px)`
    }
  })
}

// ===== Text Split Animation (for potential future use) =====
function splitText(element) {
  const text = element.textContent
  element.innerHTML = ''

  text.split('').forEach((char, i) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.animationDelay = `${i * 0.03}s`
    element.appendChild(span)
  })
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn')
  const navLinks = document.querySelector('.nav-links')

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active')
      navLinks.classList.toggle('mobile-open')
    })
  }
}

// ===== Counter Animation for Stats =====
function initCounterAnimation() {
  const stats = document.querySelectorAll('.stat-number')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalValue = parseInt(target.textContent)
        let currentValue = 0
        const increment = finalValue / 50
        const duration = 1500
        const stepTime = duration / 50

        const counter = setInterval(() => {
          currentValue += increment
          if (currentValue >= finalValue) {
            target.textContent = finalValue + '+'
            clearInterval(counter)
          } else {
            target.textContent = Math.floor(currentValue) + '+'
          }
        }, stepTime)

        observer.unobserve(target)
      }
    })
  }, { threshold: 0.5 })

  stats.forEach(stat => observer.observe(stat))
}

// ===== Background Grid Canvas =====
function initGridCanvas() {
  const canvas = document.getElementById('grid-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let animationId
  let mouseX = 0
  let mouseY = 0

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Draw the grid
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const gridSize = 50
    const dotRadius = 1
    const maxDistance = 150

    // Draw dots at grid intersections
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        // Calculate distance from mouse
        const dx = mouseX - x
        const dy = mouseY - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate opacity and size based on distance
        let opacity = 0.15
        let radius = dotRadius

        if (distance < maxDistance) {
          const factor = 1 - (distance / maxDistance)
          opacity = 0.15 + (factor * 0.4)
          radius = dotRadius + (factor * 2)
        }

        // Draw dot
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
        ctx.fill()

        // Draw connecting lines to nearby dots when mouse is close
        if (distance < maxDistance) {
          // Connect to right dot
          if (x + gridSize < canvas.width) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + gridSize, y)
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.5})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }

          // Connect to bottom dot
          if (y + gridSize < canvas.height) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x, y + gridSize)
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.5})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Draw subtle grid lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.lineWidth = 0.5

    // Vertical lines
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    animationId = requestAnimationFrame(drawGrid)
  }

  // Initialize
  resizeCanvas()
  drawGrid()

  // Handle resize
  window.addEventListener('resize', () => {
    resizeCanvas()
  })
}

// ===== Cursor Effect (Optional Enhancement) =====
function initCursor() {
  const cursor = document.createElement('div')
  cursor.className = 'custom-cursor'
  document.body.appendChild(cursor)

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px'
    cursor.style.top = e.clientY + 'px'
  })

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .work-item, .service-card')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'))
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'))
  })
}

// ===== Initialize All Functions =====
document.addEventListener('DOMContentLoaded', () => {
  // Pause hero animations until loader completes
  document.querySelectorAll('.reveal-up').forEach(el => {
    el.style.animationPlayState = 'paused'
  })

  initLoader()
  initNavScroll()
  initScrollReveal()
  initSmoothScroll()
  initMagneticButtons()
  initServiceCardBg()
  initServiceCardsCycle()
  initWorkItemsEffect()
  initParallax()
  initMobileMenu()
  initCounterAnimation()
  initGridCanvas()

  // Uncomment for custom cursor effect
  // initCursor()
})

// ===== Preload Optimization =====
window.addEventListener('load', () => {
  // Additional optimizations after full page load
  document.body.classList.add('loaded')
})
