<template>
  <div>
    <h1>Nuxt 3 설치 완료!</h1>
    <p>개발 서버가 정상 작동 중입니다.</p>
    <p>{{ data.message }}</p>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: false  // 미들웨어 적용
  });


console.log('Nuxt 3 실행 중')

const { data } = await useFetch('/api/connectionTest')

</script>
