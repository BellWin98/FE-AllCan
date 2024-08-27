<template>
    <v-container class="auth-container">
        <v-card outlined>
            <v-card-title class="justify-center">로그인</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleSubmit" class="auth-form">
                    <v-text-field v-model="authData.username" label="이메일" outlined required
                        prepend-inner-icon="mdi-email"></v-text-field>

                    <v-text-field v-model="authData.password" label="비밀번호" type="password" outlined required
                        prepend-inner-icon="mdi-lock"></v-text-field>

                    <v-btn type="submit" color="primary" block class="my-4">
                        로그인
                    </v-btn>
                </v-form>
                <div class="social-login">
                    <p>OR</p>
                    <v-btn class="social-btn" color="#ffeb00" dark block @click="socialLogin('kakao')">
                        <v-icon left>mdi-chat</v-icon>
                        카카오
                    </v-btn>
                    <v-btn class="social-btn" color="#db4437" dark block @click="socialLogin('google')">
                        <v-icon left>mdi-google</v-icon>
                        Google
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            authData: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await this.$store.dispatch("login", this.authData);
                console.log(response);

                if (response.status === 200){
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    alert("로그인에 성공하였습니다.");
                    this.$router.push({name: 'HomeView'});
                }

            } catch (error){
                console.error(error);
                alert(error.response.data.errorMessage);
            }
        },
        socialLogin(provider) {
            // 소셜 로그인 로직 구현
            console.log(`${provider} 로그인 시도`);
        },
    },
};
</script>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 50px auto;
}

.social-login p {
    margin: 1.5em 0;
    text-align: center;
}

.social-btn {
    margin-bottom: 1em;
}
</style>