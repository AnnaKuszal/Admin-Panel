import {select, classNames} from './settings.js';

const app = {

  init: function (){
    const thisApp = this;

    thisApp.initPages();
    thisApp.initActions();
  },

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){

      if(page.id === idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){

      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = `#/${id}`;
      });
    }

  },

  activatePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == `#${pageId}`);
    }
  },

  initActions(){

    function toggleMenu(visible){
      document.querySelector('.panel-left').classList.toggle('show', visible);
    }

    document.querySelector('.mobile-menu .hamburger').addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });

    function addFixedLeft() {
      const panelLeft = document.querySelector('.panel-left');
      let panelLeftWidth = panelLeft.offsetWidth;
      const sidebar = document.querySelector('.sidebar');

      if(panelLeftWidth > 1){
        sidebar.classList.add('fixed');
        sidebar.style.width = `${panelLeftWidth}px`;
      }
    }

    function addFixedRight() {
      const panelRight = document.querySelector('.panel-right');
      let panelRightWidth = panelRight.offsetWidth;
      const topBarWrapper = document.querySelector('.top-bar-wrapper');

      topBarWrapper.classList.add('fixed');
      topBarWrapper.style.width = `${panelRightWidth}px`;
    }

    addFixedLeft();
    addFixedRight();


    window.addEventListener('resize', function(e){
      e.preventDefault();
      const pageView = document.querySelector('.page-view');
      let pageViewWidth = pageView.offsetWidth;
      const sidebar = document.querySelector('.sidebar');

      if(pageViewWidth > 767) {
        addFixedLeft();
        addFixedRight();
      }

      if(pageViewWidth <= 767) {
        sidebar.classList.remove('fixed');
        sidebar.style.width = '299px';

        addFixedRight();
      }

    }, true);


    function closeModal() {
      document.getElementById('overlay').classList.remove('show-mod');
    }

    document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
      });
    });

    document.querySelector('#overlay').addEventListener('click', function(e) {
      if(e.target === this) {
        closeModal();
      }
    });

    document.addEventListener('keyup', function(e) {
      if(e.keyCode === 27) {
        e.preventDefault();
        closeModal();
      }
    });


    function openModal(modal) {
      document.querySelectorAll('#overlay > *').forEach(function(modal) {
        modal.classList.remove('show-mod');
      });
      document.querySelector('#overlay').classList.add('show-mod');
      document.querySelector(modal).classList.add('show-mod');
    }

    window.addEventListener('beforeunload', function(e) {
      e.preventDefault();
      e.returnValue = false;
      openModal('#myModal');
    });
  },

};

app.init();
