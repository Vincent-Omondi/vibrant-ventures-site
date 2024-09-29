// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(event) {
    const button = event.target;
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
    showAddedToCartMessage(name);
}

function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.textContent = `${productName} added to cart!`;
    message.style.position = 'fixed';
    message.style.bottom = '20px';
    message.style.right = '20px';
    message.style.backgroundColor = 'var(--accent-color)';
    message.style.color = 'white';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '5px';
    message.style.zIndex = '1000';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'opacity 0.5s ease';
        message.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 2000);
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    const viewCartButton = document.getElementById('view-cart');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartButton = document.getElementById('close-cart');

    if (viewCartButton) {
        viewCartButton.addEventListener('click', () => {
            updateCart();
            cartPopup.style.display = 'block';
        });
    }

    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            cartPopup.style.display = 'none';
        });
    }

    // Newsletter popup
    const newsletterPopup = document.getElementById('newsletter-popup');
    const closeNewsletterButton = document.getElementById('close-newsletter');
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterPopup && closeNewsletterButton && newsletterForm) {
        setTimeout(() => {
            newsletterPopup.style.display = 'block';
        }, 5000);

        closeNewsletterButton.addEventListener('click', () => {
            newsletterPopup.style.display = 'none';
        });

        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            if (validateEmail(email)) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterPopup.style.display = 'none';
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add active class to current navigation item
const currentLocation = location.href;
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    if (item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Intersection Observer for fade-in effect
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});