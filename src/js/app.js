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
    
    
    function addFixed() {
      var panelLeftWidth = $('.panel-left').width();      
    
      if(panelLeftWidth > 5){
        $('.sidebar').addClass('fixed').width(panelLeftWidth);
      }
    
      var panelRightWidth = $('.panel-right').width();      
      $('.top-bar-wrapper').addClass('fixed').width(panelRightWidth);
       
    }

    addFixed(); 
    
    $(window).resize(
      function() {
        addFixed(); 
      });


    function closeModal() {
      document.getElementById('overlay').classList.remove('show');
    }

    document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
      console.log('Button', btn);
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
        modal.classList.remove('show');
      });
      document.querySelector('#overlay').classList.add('show');
      document.querySelector(modal).classList.add('show');
    }

   
    window.addEventListener('beforeunload', function(e) {
      e.preventDefault();

      e.returnValue = false;

      openModal('#myModal');

    });

  },

};

app.init();