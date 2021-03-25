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
        popupShow: false
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
            alert(res);
            return res; })
        .catch(error => {
            alert(error);
            console.log(error) });

        },
    addCard() {
        if(this.userName && this.userEmail && this.userMessage) {
            let objCard = {
                "name": this.userName,
                "email": this.userEmail,
                "message": this.userMessage
            };
            this.postJson(objCard,`${API + this.createUrl}`)
                .then(result => {
                    let newID = this.cards.reduce( (sum,item) => sum + item.id, 0)
                    let itemtheme = `card-body content__item-${ newID % 2 ? "green" : "gray"}`;
                    let headingtheme = `card-title content__heading content__heading-${ newID % 2 ? "green" : "gray"}`;
                    let item = Object.assign({ "itemtheme": itemtheme, "headingtheme": headingtheme }, objCard);
                    this.cards.push(item);
                    return this.popupShow = true;
                            // if(result)
                    //     console.log(result);
                });
            }
        },
    clearForm() {
        this.userName = '';
        this.userEmail = '';
        this.userMessage = '';
        this.popupShow = !this.popupShow;
    }
    },
    mounted() {
        this.getJson(`${API + this.readUrl}`)
            .then(data => {
                for (let el of data) {
                    let itemtheme = `card-body content__item-${ el.id % 2 ? "green" : "gray"}`;
                    let headingtheme = `card-title content__heading content__heading-${ el.id % 2 ? "green" : "gray"}`;
                    const item = Object.assign( {itemtheme: itemtheme, headingtheme: headingtheme}, el);
                    this.cards.push(item);
                }
            });
        }
    });

