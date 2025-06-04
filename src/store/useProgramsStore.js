import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProgramsStore = defineStore('programs', () => {
  const disciplines = ref([
    {
      title: 'HTML, CSS',
      attributes: ['IT', 'Артефакты'],
      programs: [
        {
          id: 1,
          title: 'Введение',
          attributes: ['Easy'],
          sections: [{ text: 'Введение в HTML и CSS' }],
          media: [],
        },
        {
          id: 2,
          title: 'Семантические теги',
          attributes: ['Normal'],
          sections: [{ text: 'Значение семантических тегов' }],
          media: [],
        },
        {
          id: 3,
          title: 'Подключение стилей',
          attributes: ['Normal'],
          sections: [{ text: 'Способы подключения CSS' }],
          media: [],
        },
        {
          id: 4,
          title: 'Анимации',
          attributes: ['Hard'],
          sections: [{ text: 'Создание анимаций на CSS' }],
          media: [],
        },
      ],
    },
    {
      title: 'JavaScript',
      attributes: ['IT', 'Артефакты'],
      programs: [
        {
          id: 5,
          title: 'Основы JavaScript',
          attributes: ['Easy'],
          sections: [{ text: 'Переменные, типы данных' }],
          media: [],
        },
        {
          id: 6,
          title: 'Функции и замыкания',
          attributes: ['Normal'],
          sections: [{ text: 'Как работают функции' }],
          media: [],
        },
      ],
    },
  ])

  // Получение программ по дисциплине
  const getProgramsByDiscipline = (disciplineTitle) => {
    const discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    return discipline ? discipline.programs : []
  }

  // Добавление программы в дисциплину
  const addProgram = (disciplineTitle, newProgram) => {
    let discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    if (!discipline) {
      discipline = { title: disciplineTitle, attributes: ['IT'], programs: [] }
      disciplines.value.push(discipline)
    }
    discipline.programs.push({
      id: newProgram.id || Date.now(),
      title: newProgram.title,
      attributes: newProgram.attributes || [],
      sections: newProgram.sections || [],
      media: newProgram.media || [],
    })
  }

  // Удаление программы
  const deleteProgram = (disciplineTitle, id) => {
    const discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    if (discipline) {
      discipline.programs = discipline.programs.filter((program) => program.id !== id)
    }
  }

  // Редактирование программы
  const editProgram = (disciplineTitle, updatedProgram) => {
    console.log('Editing program:', disciplineTitle, updatedProgram)
    const discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    if (discipline) {
      const index = discipline.programs.findIndex((program) => program.id === updatedProgram.id)
      if (index !== -1) {
        discipline.programs[index] = {
          ...updatedProgram,
          media: updatedProgram.media || [],
        }
        console.log('Program edited successfully:', discipline.programs[index])
      }
    }
  }

  // Редактирование дисциплины
  const editDiscipline = (oldTitle, updatedDiscipline) => {
    console.log('Editing discipline:', oldTitle, updatedDiscipline)
    const index = disciplines.value.findIndex((d) => d.title === oldTitle)
    if (index !== -1) {
      disciplines.value[index] = {
        ...disciplines.value[index],
        ...updatedDiscipline,
        title: updatedDiscipline.title, 
      }
      console.log('Discipline edited successfully:', disciplines.value[index])
    }
  }

  return {
    disciplines,
    getProgramsByDiscipline,
    addProgram,
    deleteProgram,
    editProgram,
    editDiscipline,
  }
})