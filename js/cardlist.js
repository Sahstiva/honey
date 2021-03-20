Vue.component('cards', {
    props: ['cards'],
    template:   `<div class="content__wrapper">
                <card v-for = "user of cards" 
                :key = "user.id"
                :user = "user">
                </card>
                </div>`
});

Vue.component('card', {
    props: ['user'],
    template:   `<div class="card w-100">
                    <div :class="user.itemtheme">
                        <h5 :class="user.headingtheme">{{ user.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted content__email">{{ user.email }}</h6>
                        <p class="card-text content__text">{{ user.message }}</p>
                    </div>
                </div>`
});