<script>

  export let searchText = "";

</script>
<header>
    <img class="logo" src="/logo.png" alt="chilling vancouver logo">
    <input type="search" class="search-bar" bind:value={searchText} placeholder="Search your event..." aria-label="Search" />
</header>
<style lang="scss">
header {
    background: linear-gradient(20deg, #91467a, #e45449, #fdd0a1);
    background-size: 180% 180%;
    animation: gradient-animation 5s ease infinite;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: .5rem 2rem;

    .logo {
        width: 100%;
        max-width: 4rem;
        height: auto;
    }

    .search-bar {
        background-color: black;
        color: white;

        &::placeholder{
            background-color: black;
            color: white;
        }
    }
}

@keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>