<template>
    <div class="profile-picture" :class="divCustomClass">
        <img 
            class="peofile-picture__img" 
            :class="customClass"
            :src="src || 'avatar-placehoder.jpg'" 
            alt="">
        />    
    </div>
</template>

<script>

export default {
    name: 'ProfileImage',
    props: ['customeClass', 'divCustomClass', 'src']
}
</script>