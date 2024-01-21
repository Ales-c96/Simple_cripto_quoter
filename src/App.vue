<script setup>
import { ref, reactive, onMounted } from 'vue'
import Alert from './components/Alert.vue'

const currencys = ref([
  { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
  { codigo: 'MXN', texto: 'Peso Mexicano' },
  { codigo: 'EUR', texto: 'Euro' },
  { codigo: 'GBP', texto: 'Libra Esterlina' },
])

const error = ref('')
const criptos = ref([])
const limit = ref('20')

const quote = reactive({
  currency: '',
  criptoCurrency: ''
})

const price = ref({})

onMounted(() => {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${limit.value}&tsym=USD`
  fetch(url)
    .then(resp => resp.json())
    .then(({ Data }) => criptos.value = Data)
})

const cotzarCripto = () => {
  if (Object.values(quote).includes('')) {
    error.value = 'Todos los campos son obligatorios'
    return
  }
  error.value = ''
  getquote()
}

const getquote = () => {
  const { currency, criptoCurrency } = quote
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCurrency}&tsyms=${currency}`

  fetch(url)
    .then(resp => resp.json())
    .then(data => price.value = data.DISPLAY[criptoCurrency][currency])
}

</script>

<template>
  <div class="container">
    <h1 class="title">Cotizador de <span>Criptomonedas</span></h1>
    <div class="content">
      <Alert v-if="error">{{ error }}</Alert>
      <form class="form" @submit.prevent="cotzarCripto">
        <div class="field">
          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="quote.currency">
            <option value="">-- Selecciona --</option>
            <option v-for="currency in currencys" :value="currency.codigo" :key="currency.codigo">
              {{ currency.texto }}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="cripto">Criptomoneda:</label>
          <select id="cripto" v-model="quote.criptoCurrency">
            <option value="">-- Selecciona --</option>
            <option v-for="cripto in criptos" :value="cripto.CoinInfo.Name" :key="cripto.CoinInfo.Name">
              {{ cripto.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="quote">
      </form>
    </div>
  </div>
</template>
