import { ref, onMounted, computed } from 'vue'

export default function useCripto() {

    const criptos = ref([])
    const loading = ref(false)
    const price = ref({})

    const currencys = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ])


    onMounted(() => {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD`
        fetch(url)
            .then(resp => resp.json())
            .then(({ Data }) => criptos.value = Data)
    })

    const getQuote = (objectQuote) => {
        loading.value = true
        price.value = {}
        const { currency, criptoCurrency } = objectQuote
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCurrency}&tsyms=${currency}`

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                price.value = data.DISPLAY[criptoCurrency][currency]
                loading.value = false
            })
            .catch(e => console.log(e))
    }

    const isResultSeted = computed(() => {
        return Object.values(price.value).length > 0;
    })

    return {
        currencys,
        criptos,
        loading,
        price,
        getQuote,
        isResultSeted
    }

}