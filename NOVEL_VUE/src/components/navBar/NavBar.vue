<template>
    <div id="nav-bar">
        <div class="left">
            <slot name="left-item"></slot>
        </div>
        <div class="center">
            <slot name="center-item"></slot>
        </div>
        <div class="right">
            <slot name="right-item"></slot>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'NavBar',
    };
</script>

<style lang="scss">
    #nav-bar {
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        padding: 0px 10px;
        width: 100%;
        align-items: center;

        .left,
        .right {
            width: 40px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .center {
           
            width: 300px;
            height: 35px;
            border-radius: 20px;
            overflow: hidden;
        }
    }
</style>