<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-mate :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-mate :article="article" />
      </div>

      <div class="row">
        <article-comments :slug="article.slug" />
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMate from './components/article-mate'
import ArticleComments from './components/article-comments'

export default {
  components: { ArticleMate, ArticleComments },
  head() {
    return {
      title: `${this.article.title} - realword`,
      meta: [
        {
          hid: 'descripetion',
          name: 'descripetion',
          content: this.article.description
        }
      ]
    }
  },
  data() {
    return {}
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const markdown = new MarkdownIt()
    article.body = markdown.render(article.body)
    return {
      article
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
