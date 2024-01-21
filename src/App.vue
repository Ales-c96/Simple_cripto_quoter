<script setup>
import { ref, reactive } from 'vue'
import Alert from './components/Alert.vue'
import Loading from './components/Loading.vue'
import useCripto from './composables/useCripto'
import QuoteResult from './components/QuoteResult.vue'

const { currencys, criptos, loading, getQuote, price, isResultSeted } = useCripto()

const error = ref('')

const quote = reactive({
  currency: '',
  criptoCurrency: ''
})

const quoteCripto = () => {
  if (Object.values(quote).includes('')) {
    error.value = 'Todos los campos son obligatorios'
    return
  }
  error.value = ''
  getQuote(quote)
}

</script>

<template>
  <div class="container">
    <h1 class="title">Cotizador de <span>Criptomonedas</span></h1>
    <div class="content">
      <Alert v-if="error">{{ error }}</Alert>
      <form class="form" @submit.prevent="quoteCripto">
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
        <input type="submit" value="Cotizar">
      </form>
      <Loading v-if="loading" />
      <QuoteResult v-if="isResultSeted" :price="price"/>
    </div>
  </div>
</template>
