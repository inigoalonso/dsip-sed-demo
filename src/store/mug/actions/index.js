import db from '@/fb'
import router from '@/router'

export default {
  setMugAction({commit}, payload) {
    let ref = db.collection('mugs')
    ref.doc(payload).get()
    .then(mug => {
      this.mug = mug.data();
      if (!mug.exists) {
        console.log("mug does not exist")
        //router.push('/mug');
      } else {
        commit('setMug', { ...mug.data(), ...{id: mug.id}})
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
}