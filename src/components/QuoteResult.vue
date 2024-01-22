<script setup>
const props = defineProps({
    price: {
        type: Object,
        required: true
    },
})
</script>

<template>
    <div class="container-result">
        <h2>Cotización</h2>
        <div class="result">
            <img :src="`https://cryptocompare.com/${price.IMAGEURL}`" alt="Icono de criptomoneda">
            <div>
                <p>Precio actual: <span>{{ price.PRICE }}</span></p>
                <p>Máximo del día: <span>{{ price.HIGHDAY }}</span></p>
                <p>Mínimo del día: <span>{{ price.LOWDAY }}</span></p>
                <p>Últimas 24 horas: <span>{{ price.CHANGEPCT24HOUR }}%</span></p>
                <p>Última actualización: <span>{{ price.LASTUPDATE }}</span></p>
            </div>
        </div>
    </div>
</template>