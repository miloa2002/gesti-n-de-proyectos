import { uid } from 'uid';
import { createStore } from 'vuex';

const store = createStore({
    state() {
      return {
        selectedComponent: 'tasks',
        projects: [],
        tasks: [],
      }
    },
    mutations: {
      setSelectedComponent(state, component) {
        state.selectedComponent = component
      },
      addProject(state,item) {
        state.projects.push({...item, id:uid()})
      },
      deleteProject(state, projectId) {
        state.projects = state.projects.filter(project => project.id !== projectId)
      },
      addTask(state, item) {
        state.tasks.push({...item, id:uid()})
      },
      deleteTask(state, taskId) {
        state.tasks = state.tasks.filter(task => task.id !== taskId)
      },
      updateTask(state, updateTask) {
        const index = state.tasks.findIndex(task => task.id === updateTask.id)
        state.tasks[index] = { ...state.tasks[index], ...updateTask };
      },
      markTaskCompleted(state, taskId) {
        const task = state.tasks.find(task => task.id === taskId)
        if(task) {
          task.completed = !task.completed;
        }
      },
      markTaskInProgress(state, taskId) {
        const task = state.tasks.find(task => task.id === taskId);
        if (task) {
          task.inProgress = !task.inProgress;
        }
      }
    },
    actions: {
      updateComponent({commit}, component) {
        commit('setSelectedComponent', component)
      },
      addProject({commit}, item) {
        commit('addProject', item)
      },
      removeProject({commit}, projectId) {
        commit('deleteProject', projectId);
      },
      addTask({commit}, item) {
        commit('addTask', item)
      },
      removeTask({commit}, taskId) {
        commit('deleteTask', taskId)
      },
      editTask({commit}, updateTask) {
        commit('updateTask', updateTask)
      },
      markTaskCompleted({commit}, taskId) {
        commit('markTaskCompleted', taskId)
      },
      markTaskInProgress({ commit }, taskId) {
        commit('markTaskInProgress', taskId);
      }
    },
    getters: {
        selectedComponent: (state) => state.selectedComponent,
        projects: (state) => state.projects,
        tasks: (state) => state.tasks,
        totalTasks: (state) => state.tasks.length,
        completedTasks: (state) => state.tasks.filter(task => task.completed).length,
        inProgressTasks: (state) => state.tasks.filter(task => task.inProgress).length,
    }
  });
  
  export default store;