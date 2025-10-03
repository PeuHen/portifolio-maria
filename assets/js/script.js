(function () {
	'use strict';

	// Helpers
	function select(selector, scope) {
		return (scope || document).querySelector(selector);
	}
	function on(event, selector, handler) {
		document.addEventListener(event, function (e) {
			if (e.target.closest(selector)) handler(e);
		});
	}

	// Update current year in footer
	const yearSpan = select('#year');
	if (yearSpan) yearSpan.textContent = new Date().getFullYear();

	// Theme removed: keep only light theme
	document.body.setAttribute('data-bs-theme', 'light');

	// Shrink navbar on scroll
	const navbar = select('.navbar');
	function handleScroll() {
		if (!navbar) return;
		const isCompact = window.scrollY > 24;
		navbar.classList.toggle('is-compact', isCompact);
	}
	window.addEventListener('scroll', handleScroll, { passive: true });
	handleScroll();

	// Smooth scroll: handled mainly by CSS scroll-behavior; ensure close mobile menu after click
	on('click', '.navbar a.nav-link', function () {
		const navCollapse = select('#navbarNav');
		if (navCollapse && navCollapse.classList.contains('show')) {
			const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
			bsCollapse.hide();
		}
	});

	// Back to top button behavior for non-anchor contexts
	const backToTop = select('#backToTop');
	if (backToTop) {
		backToTop.addEventListener('click', function (e) {
			// If link has href to #hero, default smooth works; ensure top for any page state
			setTimeout(function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 0);
		});
	}

	// Basic form validation (Bootstrap compatible)
	const form = select('#contactForm');
	if (form) {
		const WHATSAPP_PHONE = '5521982079182'; // Substitua pelo seu número com DDI/DDDs
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (!form.checkValidity()) {
				event.stopPropagation();
				form.classList.add('was-validated');
				return;
			}
			form.classList.add('was-validated');
			const nome = select('#nome').value.trim();
			const email = select('#email').value.trim();
			const mensagem = select('#mensagem').value.trim();
			const texto = `Olá! Meu nome é ${nome}.\nEmail: ${email}\n\nGostaria de falar com você sobre: ${mensagem}`;
			const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(texto)}`;
			window.open(url, '_blank');
		});
	}
})();


