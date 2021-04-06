const App = {
   data() {
      return {
         title: 'To do list',
         placeholder: 'Enter your task here',
         inputValue: '',
         notes: ['Note 1', 'Note 2', 'Note 3']


      }
   },
   methods: {
      /* inputChangeHandler(event){
         this.inputValue = event.target.value
      }, */
      addNewNote(){
         if(this.inputValue!==""){
            this.notes.push(this.inputValue)
            this.inputValue = '' 
         }
         
      },
      /* inputKeyPress(event){
         if(event.key === 'Enter'){
            this.addNewNote()
         }
      }, */
      noteDel(idx){
         this.notes.splice(idx, 1)
      },
      toUpperCase(item){
         return item.toUpperCase()
      }

   },
   computed: {
      doubleCountComputed(){
         return this.notes.length*2 ;        
      }
   },
   watch: {
      inputValue(val){
         if (val.length>=20) {
            this.inputValue = ''
         }
         
      }
   },

}


Vue.createApp(App).mount('#app');