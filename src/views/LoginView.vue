<template>
    <div class="auth-container">
        <h1>로그인</h1>
        <form @submit.prevent="handleSubmit" class="auth-form">
            <div class="form-group">
                <label for="username">이메일</label>
                <input v-model="authData.username" id="username" required />
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" v-model="authData.password" id="password" required />
            </div>
            <button type="submit" class="btn">로그인</button>
        </form>
        <div class="social-login">
            <p>OR</p>
            <button class="social-btn" @click="socialLogin('kakao')">
                <i class="fab fa-kakao"></i> 카카오
            </button>
            <button class="social-btn" @click="socialLogin('google')">
                <i class="fab fa-google"></i> Google
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            authData: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$store.dispatch('login', this.authData);
        },
        socialLogin(provider) {
            // 소셜 로그인 로직 구현
            console.log(`${provider} 로그인 시도`);
        }
    }
};
</script>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.auth-form .form-group {
    margin-bottom: 1.5em;
}

.auth-form label {
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
}

.auth-form input {
    width: 100%;
    padding: 0.75em;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
}

.btn {
    width: 100%;
    padding: 0.75em;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #555;
}

.social-login {
    margin-top: 2em;
    text-align: center;
}

.social-login p {
    margin-bottom: 1em;
}

.social-btn {
    padding: 0.75em 1.5em;
    margin: 0.5em 0;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.social-btn i {
    margin-right: 0.5em;
}

.social-btn.kakao {
    background-color: #ffeb00;
    color: black;
}

.social-btn.google {
    background-color: #db4437;
    color: white;
}

.social-btn:hover {
    background-color: #e0e0e0;
}
</style>