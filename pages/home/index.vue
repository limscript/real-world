<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  :class="{ active: tab === 'your_feed' }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                  :class="{ active: tab === 'global_feed' }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ name: 'home', query: { tab, tab: 'tag' } }"
                  ># {{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{ name: 'profile', params: { username: article.author.username } }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.createdAt | date }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                :disabled="article.favoritedDisabled"
                @click="onClickFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{ name: 'article', params: { slug: article.slug } }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <!-- 分页   -->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              v-for="item in totalPage"
              :key="item"
              :class="{ active: page === item }"
            >
              <nuxt-link
                class="page-link ng-binding"
                :to="{ name: 'home', query: { page: item, tag: $route.query.tag, tab } }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </nav>
        <!-- 分页   -->

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{ name: 'home', query: { tag, tab: 'tag' } }"
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorate, deleteFavorate } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query, store }) {
    const page = Number(query.page || 1)
    const limit = Number(query.limit || 10)
    const tag = query.tag || ''
    const tab = query.tab || 'global_feed'

    const loadAricles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles

    const [articlesRes, tagRes] = await Promise.all([
      loadAricles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagRes.data

    articles.forEach(article => (article.favoritedDisabled = false))

    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab
    }
  },
  methods: {
    // 点赞
    async onClickFavorite(acticle) {
      acticle.favoritedDisabled = true
      if (acticle.favorited) {
        await deleteFavorate(acticle.slug)
        acticle.favorited = false
        acticle.favoritesCount += -1
      } else {
        await addFavorate(acticle.slug)
        acticle.favorited = true
        acticle.favoritesCount += 1
      }
      acticle.favoritedDisabled = false
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
