'use strict';

// ===== Header: 스크롤 시 배경 변경 =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== 모바일 메뉴 토글 =====
const menuBtn   = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  menuBtn.classList.toggle('open', !isOpen);
  menuBtn.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
});

// 모바일 메뉴 링크 클릭 시 닫기
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.classList.remove('open');
  });
});

// ===== 활성 섹션에 따라 nav 링크 하이라이트 =====
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// ===== fade-in-up 스크롤 애니메이션 =====
const fadeEls = document.querySelectorAll('.fade-in-up');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ===== 스킬 카드: 프로그레스 바 애니메이션 =====
document.querySelectorAll('.skill-card').forEach(card => {
  const bar = card.querySelector('.h-1\\.5 > div');
  if (bar) {
    const inlineWidth = bar.style.width;
    bar.style.setProperty('--skill-width', inlineWidth);
  }
});

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ===== 부드러운 스크롤 (구형 브라우저 폴백) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // 헤더 높이
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});
