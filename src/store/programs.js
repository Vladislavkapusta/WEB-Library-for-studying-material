import { defineStore } from 'pinia'

export const useProgramsStore = defineStore('programs', {
  state: () => ({
    programs: [],
    selectedDiscipline: null,
  }),
  actions: {
    setDiscipline(discipline) {
      this.selectedDiscipline = discipline
    },
    addProgram(program) {
      this.programs.push({ id: Date.now(), ...program, discipline: this.selectedDiscipline })
    },
    deleteProgram(id) {
      this.programs = this.programs.filter((program) => program.id !== id)
    },
    editProgram(updatedProgram) {
      const index = this.programs.findIndex((program) => program.id === updatedProgram.id)
      if (index !== -1) {
        this.programs[index] = updatedProgram
      }
    },
    getProgramsByDiscipline(discipline) {
      return this.programs.filter((program) => program.discipline === discipline)
    },
  },
})
