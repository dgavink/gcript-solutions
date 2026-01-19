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

// ===== Service Cards Image Reveal on Scroll =====
function initServiceCardsCycle() {
  const serviceCards = document.querySelectorAll('.service-card')
  const servicesSection = document.getElementById('services')
  let hasRevealed = false

  function revealCards() {
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('image-revealed')
      }, index * 150) // Stagger each card by 150ms
    })
  }

  function hideCards() {
    serviceCards.forEach(card => {
      card.classList.remove('image-revealed')
    })
    hasRevealed = false
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRevealed) {
        hasRevealed = true
        revealCards()
      } else if (!entry.isIntersecting && hasRevealed) {
        hideCards()
      }
    })
  }, { threshold: 0.3 })

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
  const navLinksItems = document.querySelectorAll('.nav-links a')

  if (menuBtn && navLinks) {
    // Toggle menu on button click
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active')
      navLinks.classList.toggle('mobile-open')
      document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : ''
    })

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active')
        navLinks.classList.remove('mobile-open')
        document.body.style.overflow = ''
      })
    })

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
        menuBtn.classList.remove('active')
        navLinks.classList.remove('mobile-open')
        document.body.style.overflow = ''
      }
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

// ===== Image Reveal Animation =====
function initImageReveal() {
  const heroImage = document.querySelector('.hero-image')
  const workItems = document.querySelectorAll('.work-item')

  // Reveal hero image after loader
  setTimeout(() => {
    if (heroImage) {
      heroImage.classList.add('revealed')
    }
  }, 2000)

  // Reveal work items on scroll
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the reveal based on position
        const item = entry.target
        setTimeout(() => {
          item.classList.add('revealed')
        }, 100)
        workObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' })

  workItems.forEach(item => {
    workObserver.observe(item)
  })
}

// ===== Advanced Parallax for Images =====
function initAdvancedParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-image img, .hero-image img')

  if (parallaxElements.length === 0) return

  let ticking = false

  function updateParallax() {
    const scrolled = window.scrollY
    const windowHeight = window.innerHeight

    parallaxElements.forEach(el => {
      const rect = el.parentElement.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const distanceFromCenter = elementCenter - windowHeight / 2
      const parallaxSpeed = 0.15
      const translateY = distanceFromCenter * parallaxSpeed

      el.style.transform = `translateY(${translateY}px) scale(1.1)`
    })

    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }, { passive: true })
}

// ===== Clip Path Reveal Observer =====
function initClipReveal() {
  const clipElements = document.querySelectorAll('.clip-reveal, .clip-circle-reveal, .clip-diamond-reveal, .clip-diagonal-reveal, .clip-inset-reveal')

  if (clipElements.length === 0) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed')
        }, 100)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })

  clipElements.forEach(el => observer.observe(el))
}

// ===== Tilt Effect on Mouse Move =====
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.work-item, .service-card')

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    })

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    })
  })
}

// ===== Smooth Scroll Progress for Images =====
function initScrollProgress() {
  const images = document.querySelectorAll('.zoom-on-scroll')

  if (images.length === 0) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, { threshold: 0.1 })

  images.forEach(img => observer.observe(img))
}

// ===== Stagger Animation Helper =====
function staggerReveal(elements, baseDelay = 100) {
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed')
    }, index * baseDelay)
  })
}

// ===== Work Cards Background Reveal =====
function initWorkCardBg() {
  const workCards = document.querySelectorAll('.work-card')

  workCards.forEach(card => {
    const bgUrl = card.dataset.bg
    if (bgUrl) {
      card.querySelector('.work-card-bg').style.backgroundImage = `url(${bgUrl})`
    }
  })
}

// ===== Work Card Zoom on Click =====
function initWorkCardZoom() {
  const workCards = document.querySelectorAll('.work-card')
  const overlay = document.querySelector('.work-card-overlay')
  let expandedCard = null
  let originalStyles = {}

  workCards.forEach(card => {
    // Add close button to each card
    const closeBtn = document.createElement('div')
    closeBtn.className = 'work-card-close'
    card.appendChild(closeBtn)

    // Click to expand
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('work-card-close')) {
        closeCard()
        return
      }

      if (expandedCard === card) return

      expandCard(card)
    })

    // Close button click
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      closeCard()
    })
  })

  // Click overlay to close
  overlay.addEventListener('click', closeCard)

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expandedCard) {
      closeCard()
    }
  })

  function expandCard(card) {
    // Get current position
    const rect = card.getBoundingClientRect()

    // Store original styles
    originalStyles = {
      top: rect.top + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px'
    }

    // Set initial fixed position
    card.style.position = 'fixed'
    card.style.top = originalStyles.top
    card.style.left = originalStyles.left
    card.style.width = originalStyles.width
    card.style.height = originalStyles.height
    card.style.margin = '0'
    card.classList.add('expanding')

    // Show overlay
    overlay.classList.add('active')

    // Calculate center position - scale up keeping aspect ratio
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const scaleFactor = 2.5
    const expandedWidth = rect.width * scaleFactor
    const expandedHeight = rect.height * scaleFactor
    const centerX = (viewportWidth - expandedWidth) / 2
    const centerY = (viewportHeight - expandedHeight) / 2

    // Animate to center
    requestAnimationFrame(() => {
      card.classList.add('expanded')
      card.style.top = centerY + 'px'
      card.style.left = centerX + 'px'
      card.style.width = expandedWidth + 'px'
      card.style.height = expandedHeight + 'px'
    })

    expandedCard = card
    document.body.style.overflow = 'hidden'
  }

  function closeCard() {
    if (!expandedCard) return

    const card = expandedCard

    // Animate back to original position
    card.style.top = originalStyles.top
    card.style.left = originalStyles.left
    card.style.width = originalStyles.width
    card.style.height = originalStyles.height

    // Hide overlay
    overlay.classList.remove('active')

    // After animation, reset styles
    setTimeout(() => {
      card.classList.remove('expanded', 'expanding')
      card.style.position = ''
      card.style.top = ''
      card.style.left = ''
      card.style.width = ''
      card.style.height = ''
      card.style.margin = ''
      document.body.style.overflow = ''
    }, 500)

    expandedCard = null
  }
}

function initWorkCardsCycle() {
  const workCategories = document.querySelectorAll('.work-category')

  workCategories.forEach(category => {
    const cards = category.querySelectorAll('.work-card')
    if (cards.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reveal all cards in this category with stagger
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('image-revealed')
            }, index * 150)
          })
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    })

    observer.observe(category)
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

  // New animation functions
  initImageReveal()
  initAdvancedParallax()
  initClipReveal()
  initTiltEffect()
  initScrollProgress()
  initWorkCardBg()
  initWorkCardsCycle()
  initWorkCardZoom()
  initDynamicBackground()

})

// ===== Dynamic Background Color Transitions =====
function initDynamicBackground() {
  const bgLayer = document.querySelector('.bg-color-layer')
  const blobs = document.querySelectorAll('.bg-color-blob')
  const sections = document.querySelectorAll('[data-bg-color]')

  if (!bgLayer || sections.length === 0) return

  let currentColor = '#ffffff'

  function updateBackgroundColor(color) {
    if (color === currentColor) return
    currentColor = color

    // Update the background layer color
    bgLayer.style.backgroundColor = color

    // Update blob colors for the splash effect
    blobs.forEach(blob => {
      blob.style.setProperty('--blob-color', color)
      blob.classList.add('active')
    })
  }

  // Create intersection observer for each section
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const color = entry.target.getAttribute('data-bg-color')
        if (color) {
          updateBackgroundColor(color)
        }
      }
    })
  }, observerOptions)

  sections.forEach(section => {
    observer.observe(section)
  })

  // Initial state
  setTimeout(() => {
    blobs.forEach(blob => {
      blob.style.setProperty('--blob-color', '#ffffff')
      blob.classList.add('active')
    })
  }, 2000)
}

// ===== Preload Optimization =====
window.addEventListener('load', () => {
  // Additional optimizations after full page load
  document.body.classList.add('loaded')
})
