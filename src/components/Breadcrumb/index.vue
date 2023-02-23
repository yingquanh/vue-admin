<template>
    <a-breadcrumb>
        <template v-for="(route, index) in routes" :key="index">
            <a-breadcrumb-item v-if="routes.length-1 === index">
                <home-outlined v-if="!index" />
                {{ route.meta.title }}
            </a-breadcrumb-item>
            <a-breadcrumb-item v-else href="">
                <template v-if="($route.name === 'ExamineDetails' || $route.name === 'CreateExamine' || $route.name === 'EditExamine') && route.name === 'TrainExamine'">
                    <router-link :to="`${route.path}?train_id=1`">
                        <home-outlined v-if="!index" />
                        {{ route.meta.title }}
                    </router-link>
                </template>
                <template v-else>
                    <router-link :to="route.path">
                        <home-outlined v-if="!index" />
                        {{ route.meta.title }}
                    </router-link>
                </template>

                <!-- <router-link :to="route.path">
                    <home-outlined v-if="!index" />
                    {{ route.meta.title }}
                </router-link> -->
            </a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Breadcrumb',
    props: {
        routes: {
            type: Array,
            default() {
                return []
            }
        },
    },
    setup() {
        

        return {
            
        }
    }
})
</script>
