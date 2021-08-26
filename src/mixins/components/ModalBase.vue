<template>
  <v-dialog
    :key="$parent.key"
    v-model="$parent.isOpen"
    content-class="modalBase"
    :persistent="persistent || $parent.persistent"
    :fullscreen="isFullscreen"
    :scrollable="scrollable"
    :width="width"
  >
    <v-card :id="id" :class="noPadding && 'noPadding noOverflow'">
      <v-toolbar dark class="flex-grow-0" color="primary" flat>
        <v-toolbar-title>{{ $parent.title }}</v-toolbar-title>
        <slot name="title" />
        <v-spacer />
        <v-toolbar-items>
          <slot name="toolbar" />
          <v-btn icon title="Fechar" @click.native="$parent.handlerClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text :class="isFullscreen && 'fullscreen'">
        <p v-if="$parent.loading" class="text-center my-10">
          <v-progress-circular indeterminate size="100" color="primary" />
        </p>
        <slot v-else name="content" />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <template v-if="!$parent.hideFooter">
          <slot name="actions">
            <template v-if="$parent.edited">
              <v-btn
                color="primary"
                text
                depressed
                :disabled="$parent.loading || $parent.saving"
                @click="$parent.handlerClose"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="success"
                depressed
                :loading="$parent.saving"
                :disabled="$parent.loading"
                @click="$parent.submit"
              >
                {{ $parent.saveBtnText || 'Salvar' }}
              </v-btn>
            </template>
            <template v-else>
              <v-btn color="info" depressed @click="$parent.handlerClose">
                {{ $parent.isUpdate ? 'Feito/Fechar' : 'Fechar/Cancelar' }}
              </v-btn>
            </template>
            <slot name="addActions" />
          </slot>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalBase',
  props: {
    width: { type: [Number, String], default: 400 },
    fullscreen: Boolean,
    scrollable: { type: Boolean, default: true },
    persistent: Boolean,
    id: { type: String, default: null },
    noPadding: Boolean,
  },

  computed: {
    isFullscreen () {
      if (this.fullscreen) { return true }
      const breakpoint = this.$vuetify.breakpoint.name
      return breakpoint === 'xs'
    },
  },
}
</script>
