// const API = 'http://127.0.0.1:5500/api';
const API = 'https://www.vitshas.me/portfolio/honey/api/card';

const app = new Vue({
    el: '#app',
    data: {
        readUrl: '/read.php',
        createUrl: '/create.php',
        cards: [],
        userName: '',
        userEmail: '',
        userMessage: '',
        popupShow: false,
        popupMessage: '',
        patterns: {
            name: /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/g,
            email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        nameValid: false,
        emailValid: false,
    },
    methods: {
    getJson(url) {
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
        },
    postJson(data, url) {
        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            let res = result.json();
            return res; })
        .catch(error => {
            console.log(error) });

        },
    addCard() {
        if(this.userName && this.userEmail && this.userMessage && this.nameValid && this.emailValid) {
            let objCard = {
                "name": this.userName,
                "email": this.userEmail,
                "message": this.userMessage
            };
            this.postJson(objCard,`${API + this.createUrl}`)
                .then(result => {
                    this.cards.push(objCard);
                    this.popupMessage = "Запись добавлена"
                    return this.popupShow = true;
                });
        }
        else {
            this.popupMessage = "Форма заполнена неверно!";
            this.popupShow = true;
        }
            
        },
    clearForm() {
        this.userName = '';
        this.userEmail = '';
        this.userMessage = '';
        this.popupMessage = '';
        this.nameValid = false;
        this.emailValid = false;
        this.popupShow = !this.popupShow;
        },
    },
    mounted() {
        this.getJson(`${API + this.readUrl}`)
            .then(data => {
                for (let el of data) {
                    this.cards.push(el);
                }
            });
        }
    });

