<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { useRoute } from 'vue-router'
import { NH3 } from 'naive-ui'

const props = defineProps({
    pageTitle: {
        type: String as PropType<string | null>,
        required: false
    }
})

const route = computed(() =>
    props.pageTitle ? props.pageTitle : useRoute()?.name?.toString()
)
</script>

<template>
    <div class="route-title-container">
        <n-h3>{{ route }}</n-h3>
    </div>
</template>

<style lang="scss" scoped>
.route-title-container {
    .n-h3 {
        margin: unset;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-transform: capitalize;
        line-height: 20px;
        font-size: 18px;
        font-weight: 600;
        color: $grey-3;
    }
}


// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
    .route-title-container {
        .n-h3 {
            max-width: 150px;
            font-size: 14px;
        }
    }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  .route-title-container {
        .n-h3 {
            max-width: 150px;
            font-size: 15px;
        }
    }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
    .route-title-container {
        .n-h3 {
            max-width: 150px;
            font-size: 15.5px;
        }
    }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
    .route-title-container {
        .n-h3 {
            max-width: 150px;
            font-size: 17px;
        }
    }
}
</style>
