<template>
    <div>
        <button
            @click="toggleActions"
            class="notification-btn d-flex position-fixed justify-content-center align-items-center p-0"
            aria-label="Afficher les notifications">

            <span
                v-if="notificationsList.length"
                class="notifications-number position-absolute d-flex justify-content-center align-items-center"> 
                {{ notificationsList.length }} 
            </span>
            <b-icon icon="bell-fill"></b-icon>
        </button>
        <b-collapse
            v-if="notificationsList.length"
            id="notification-collapsed"
            v-bind:class="
            `collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}`">

            <b-card class="border-0" @click="toggleActions">
                <div v-for="notification in notificationsList">
                <router-link
                    :to="{ name: 'OnePost', params: { postId: notification.postId } }"
                    @click.native="deleteNotification(notification)">
                    <div class="d-flex align-items-center">
                        <div>
                        <ProfileImage
                        :src="notification.Sender.imageUrl"
                        customClass="like-profile-picture"
                        divCustomClass="div-like-picture"
                        />
                        </div>
                        <p v-html="notification.content" class="card-text text-left py-2 mb-3">
                        </p>
                    </div>
                </router-link>
                </div>
            </b-card>
        </b-collapse>
        <b-collapse
            v-else
            id="notification-collapsed"
            v-bind:class="
            `collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}`">
            <b-card class="border-0">
                <div class="d-flex align-items-center">
                    <p class="card-text text-left py-2 mb-3">
                    Vous n'avez pas de nouvelles notifications
                    </p>
                </div>
            </b-card>
        </b-collapse>
    </div>
</template>