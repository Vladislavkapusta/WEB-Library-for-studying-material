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
          name: 'Введение',
          attributes: ['Easy'],
          sections: [{ text: 'Введение в HTML и CSS' }],
        },
        {
          id: 2,
          name: 'Семантические теги',
          attributes: ['Normal'],
          sections: [{ text: 'Значение семантических тегов' }],
        },
        {
          id: 3,
          name: 'Подключение стилей',
          attributes: ['Normal'],
          sections: [{ text: 'Способы подключения CSS' }],
        },
        {
          id: 4,
          name: 'Анимации',
          attributes: ['Hard'],
          sections: [{ text: 'Создание анимаций на CSS' }],
        },
      ],
    },
    {
      title: 'JavaScript',
      attributes: ['IT', 'Артефакты'],
      programs: [
        {
          id: 5,
          name: 'Основы JavaScript',
          attributes: ['Easy'],
          sections: [{ text: 'Переменные, типы данных' }],
        },
        {
          id: 6,
          name: 'Функции и замыкания',
          attributes: ['Normal'],
          sections: [{ text: 'Как работают функции' }],
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
      // Если дисциплина не найдена, создаем новую
      discipline = { title: disciplineTitle, programs: [] }
      disciplines.value.push(discipline)
    }
    discipline.programs.push({
      id: Date.now(),
      ...newProgram,
      sections: newProgram.sections || [],
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
    const discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    if (discipline) {
      const index = discipline.programs.findIndex((program) => program.id === updatedProgram.id)
      if (index !== -1) {
        discipline.programs[index] = { ...updatedProgram }
      }
    }
  }

  return {
    disciplines,
    getProgramsByDiscipline,
    addProgram,
    deleteProgram,
    editProgram,
  }
})
