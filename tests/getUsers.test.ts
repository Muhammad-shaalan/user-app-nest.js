
import { shallowMount, config } from "@vue/test-utils"
import MyComponent from '../pages/users/index.vue';

describe("MyComponent", () => {

    let wrapper
  
    beforeEach(() => {
      wrapper = shallowMount(MyComponent)
    })
  
    it("behavior of the component with a mocked data.", async () => {
      await wrapper.vm.useLazyFetch
    })
})
  