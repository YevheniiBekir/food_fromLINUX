'use strict';
document.addEventListener('DOMContentLoaded', () => {

    //console.log//console.log//console.log//console.log
    function log(arg){
        console.log(arg);
    }

    //tabs//tabs//tabs//tabs//tabs//tabs//tabs//tabs//tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    const hideTabContent = () => {
        tabsContent.forEach(item => {
        item.style.display = 'none';
        });
        
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    const showTabContent = (i = 0) => {
        tabsContent[i].style.display = 'block';

        tabs[i].classList.add('tabheader__item_active');
    };
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        tabs.forEach((item, i) => {
        if(e.target.className === 'tabheader__item'){
                hideTabContent();
                showTabContent(i);
            }
        });
        
    });    

    //timer//timer//timer//timer//timer//timer//timer//timer
    const timeLine = '2023-02-03';
    
    function getTime (line){
        let days, hours, minutes, seconds;
        
        const time = Date.parse(line) - Date.parse(new Date());
        if( time <= 0 ){
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((time / (1000 * 60)) % 60),
            seconds = Math.floor((time / 1000) % 60);
        }

        return {
            time,
            days,
            hours,
            minutes,
            seconds 
        };

    }

    function getZero(num){

        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }

    }

    function setClock(selector, timeLine){

        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(reloadTime, 1000);

        reloadTime();

        function reloadTime(){
            const t = getTime(timeLine);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if(t.time <= 0 ){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', timeLine);

    //Modal Window//Modal Window//Modal Window//Modal Window
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[modal-close]');

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timeOfModalOpen);
    }
    function closeModal () {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        });

    });
    modalCloseBtn.addEventListener('click', () => {
        closeModal();
    });
    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow){
            closeModal(modalWindow);
        }
    });


    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modalWindow.classList.contains('show')){
            closeModal(modalWindow);
        }
    });


    const timeOfModalOpen = setTimeout(openModal, 15000);


    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);



    //Creation new food-cards//Creation new food-cards//Creation new food-cards
    class NewMenuCard{
        constructor(src, alt, title, desc, price, transfer, parent, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.transfer = transfer;
            this.classes = classes;
            this.parent = document.querySelector(parent);
            this.curChange();
            
        }

        curChange(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(classEl => {
                    element.classList.add(classEl);
                });
            }
            
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
        this.parent.append(element);
        }
    }



    const vegyMenuCard = new NewMenuCard(
        '"img/tabs/vegy.jpg"',
        '"vegy"',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        7,
        36,
        '.menu .container'
    );
    vegyMenuCard.render();
    
    const premiumMenuCard = new NewMenuCard(
        '"img/tabs/elite.jpg"',
        '"elite"',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        11,
        36,
        '.menu .container'
    );
    premiumMenuCard.render();

    const postMenuCard = new NewMenuCard(
        '"img/tabs/post.jpg"',
        '"post"',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        5,
        36,
        '.menu .container'
    );
    postMenuCard.render();

    //posting data in backend//posting data in backend
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Завантаження',
        success: 'Вітання, ваш запит пройшов успішно !',
        failure: 'Упс... Сталася помилка :('
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            form.append(textMessage);

            const request = new XMLHttpRequest();
            const formData = new FormData(form);
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'multipart/form-data');
            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status === 200){
                    textMessage.textContent = message.success;
                }else{
                    textMessage.textContent = message.failure;
                }
            });
        });
    }
    //hello bros !
});