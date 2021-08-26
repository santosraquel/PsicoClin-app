import { OnMsg } from '~/mixins'

export default {
  mixins: [OnMsg],

  head () {
    return {
      title: this.pageTitle,
    }
  },

  /**
   * Define common scoped data
   * @returns {Object}
   */
  data () {
    return {
      search: '',
      items: [],
      count: 0,
      options: {},
      listOptions: {},
      archiveItems: {},
      loading: false,
      error: false,
      loadingArchive: false,
      isModalOpen: false,
      items_per_page: [10, 30, 50, 100, -1],
    }
  },

  watch: {
    options: {
      handler () {
        this.list(this.options)
      },
      deep: true,
    },
  },

  /**
   * Define common CRUD methods
   */
  methods: {

    /** Close modal form if exist() */
    closeForm () {
      if (this.$refs.form) {
        this.$refs.form.close()
      }
    },

    /**
     * Remove a record
     * @param data
     */
    remove (item) {
      this.$service.remove(item)
        .then(() => {
          this.items.splice(this.getItemIndex(item), 1)
          this.infoSnack('Item excluído.')
        })
        .catch((error) => {
          this.errorSnack()
          console.error('Falha ao remover', error)
        })
      this.closeForm()
    },

    addSaved (data) {
      const index = this.getItemIndex(this.target)
      if (index !== -1) {
        this.$set(this.items, index, data)
        this.target = this.items[index]
      } else {
        this.list(this.listOptions)
      }
    },

    /**
     * List whating 500ms (E.g. await user stop interation)
     * @param params
     */
    autoList (time = 500) {
      clearTimeout(this.autoListTimeOut)
      this.autoListTimeOut = setTimeout(() => {
        this.list()
      }, time)
    },

    /**
     * Update list (items)
     * @param params
     */
    list (options = {}) {
      this.listOptions = options
      if (!this.$service) { return }
      if (this.search) {
        options.search = this.search
      }
      options.limit = options.itemsPerPage
      this.loading = true
      return this.$service.list(options)
        .then((data) => {
          this.items = data.items
          this.count = data.count
        })
        .catch((error) => {
          console.error('Falha ao listar', error)
          this.error = true
          this.errorSnack()
        }).then(() => {
          this.loading = false
        })
    },

    getItemIndex (item) {
      return this.items.indexOf(item)
    },

    /**
     * Open form whit a record
     * @param data
     */
    openForm (item = {}) {
      this.target = item
      this.$refs.form.open(item)
    },

    /**
     * Load print
     */
    print () {
      window.print()
    },
  },
}
