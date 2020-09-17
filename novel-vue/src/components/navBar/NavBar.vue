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
        padding: 0px 0.625rem;
        width: 100%;
        align-items: center;

        .left,
        .right {
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .center {
            border: 1px solid red;
            width: 18.75rem;
            height: 1.875rem;
            border-radius: 1.25rem;
            overflow: hidden;
        }
    }
</style>