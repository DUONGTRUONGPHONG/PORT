<template>
    <Body class=" text-black max-w-screen max-w-full w-full overflow-x-hidden">
        <Component :is="header[hostname]" />
        <slot />
        <Component :is="footer[hostname]" />
    </Body>
</template>
<script setup>
    import { HeaderTTTC, Header, FooterTTTC, Footer } from './index'
    const router = useRouter()
    const checkRouter = router.currentRoute.value.query.layout
    const header = {
        thitruongtaichinh: HeaderTTTC,
        stable: Header
    }
    const footer = {
        thitruongtaichinh: FooterTTTC,
        stable: Footer
    }
    const url = useRequestURL();
    const hostname = url.hostname.split('.')[0];
    console.log(hostname)
</script>

