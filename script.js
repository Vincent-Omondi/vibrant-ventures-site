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

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (validateForm(contactForm)) {
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            }
        });
    }

    const customOrderForm = document.getElementById('custom-order-form');
    if (customOrderForm) {
        customOrderForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (validateForm(customOrderForm)) {
                alert('Thank you for your custom order request. We will contact you shortly to discuss the details.');
                customOrderForm.reset();
            }
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

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            input.classList.add('error');
        }
    });

    return isValid;
}

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