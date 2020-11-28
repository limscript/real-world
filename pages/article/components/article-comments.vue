<template>
  <div class="col-xs-12 col-md-8 offset-md-2">
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentMessage"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="onClickSend">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{ name: 'profile', params: { username: comment.author.username } }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{ name: 'profile', params: { username: comment.author.username } }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createAt | date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, commitComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
  props: {
    slug: {
      type: String
    }
  },
  data() {
    return {
      comments: [],
      commentMessage: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    this.ajaxGetComments()
  },
  methods: {
    // 获取评论
    async ajaxGetComments() {
      const { data } = await getComments(this.slug)
      this.comments = data.comments
    },
    // 提交评论
    async onClickSend() {
      const data = {
        comment: {
          body: this.commentMessage
        }
      }
      await commitComment(this.slug, data)
      this.commentMessage = ''
      this.ajaxGetComments()
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
