<template>
    <div v-if="errors" class="errors">
        <div v-if="Array.isArray(errors)">
            <span v-for="error in errors">{{error}}</span>
        </div>
        <span v-else>{{errors}}</span>
    </div>
</template>

<script>
    export default {
        name: "error",
        props: {
            'errors': [String, Array]
        }
    }
</script>

<style>
    .errors {
        font-family: 'Pacifico', cursive;
        text-align: center;
        margin-bottom: 10px;
        color: #A93331;
    }
</style>