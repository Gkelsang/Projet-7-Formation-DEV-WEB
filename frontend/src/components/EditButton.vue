<template>
    <div>
        <button
        @click="toggleActions"
        v-if="isAdmin || isCreator"
        :class="customClass"
        class="post-button d-block position-absolute"
        aria-label="Afficher les actions">
        ...
        </button>
        <b-collapse
            v-bind:class=" `${classCollapse || '' } btn-collapsed collapsed mt-2 position-absolute ${areActionsVisible && 'visible'}` " >
            <b-card class="border-0" @click="toggleActions">
                <p class="card-text" v-if="isCreator">
                    <b-button
                        class="text-left w-100"
                        v-if="editingPost && isCreator"
                        block
                        v-b-modal="`modal-${elementId}`"
                        aria-label="Modifier">
                        <b-icon icon="pencil" class="mr-2 mr-lg-3"></b-icon>
                        <span>{{ modifyText }} </span>
                    </b-button>
                    <b-button
                        class="text-left w-100"
                        v-if="!editingPost && isCreator"
                        block
                        @click="clickedEditButton"
                        aria-label="Modifier">
                        <b-icon icon="pencil" class="mr-2 mr-lg-3"></b-icon>
                        <span>{{ modifyText }}</span>
                    </b-button>
                        <slot></slot>
                </p>
                <p class="card-text">
                    <b-button
                        class="text-left w-100"
                        v-if="isAdmin || isCreator"
                        block
                        v-on:click="onDelete"
                        aria-label="Supprimer">
                    <b-icon icon="trash" class="mr-2 mr-lg-3"></b-icon>
                        <span>{{ deleteText }}</span>
                    </b-button>
                </p>
            </b-card>
        ></b-collapse>
    </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'

export default {
    name: 'EditPost',
    props: [
        'post', 'customClass', 'isAdmin', 'isCreator', 'elementId', 'modifyText', 'deleteText', 'editingPost'
    ],
    data () {
        return {
            areActionsVisible: false
        }
    },
    methods: {
        toggleActions () {
            this.areActionsVisible = !this.areActionsVisible
        },
        async onDelete () {
            this.$emit('onDelete')
        },
        async clickEditButton () {
            this.$emit('clickEditButton')
        }
    }
}
</script>