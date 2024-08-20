<template>
    <v-container class="signup-container">
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="pa-5" outlined>
                    <v-card-title class="justify-center">회원가입</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleSubmit">
                            <!-- 이메일 입력 필드 및 중복 확인 버튼 -->
                            <v-row>
                                <v-col cols="8">
                                    <v-text-field v-model="email" label="이메일" outlined required
                                        append-outer-icon="mdi-email"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <!-- <v-btn :disabled="emailChecked || timer > 0" color="primary" block
                                        @click="checkEmail">
                                        이메일 중복 확인
                                    </v-btn> -->
                                    <v-btn color="primary" block
                                        @click="checkEmail">
                                        이메일 중복 확인
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <!-- 이메일 인증코드 전송 및 검증 필드 -->
                            <!-- <v-row v-if="emailChecked">
                                <v-col cols="8">
                                    <v-text-field v-model="verificationCode" label="인증 코드" outlined required
                                        append-outer-icon="mdi-check" :disabled="!codeSent"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn :disabled="timer > 0" color="primary" block @click="sendCode">
                                        인증코드 전송
                                    </v-btn>
                                    <span v-if="timer > 0">(유효시간: {{ timer }}초)</span>
                                </v-col>
                            </v-row> -->

                            <!-- 이메일 인증 버튼 -->
                            <!-- <v-btn v-if="codeSent" color="success" block class="mb-4" @click="verifyCode">
                                이메일 인증
                            </v-btn> -->

                            <!-- 비밀번호 입력 필드 -->
                            <v-text-field v-model="password" label="비밀번호" type="password" outlined required></v-text-field>

                            <!-- 비밀번호 입력 확인 -->
                            <v-text-field v-model="confirmPassword" label="비밀번호 확인" type="password" outlined required :error-messages="passwordError"></v-text-field>

                            <!-- 닉네임 입력 필드 및 중복 확인 버튼 -->
                            <v-row>
                                <v-col cols="8">
                                    <v-text-field v-model="nickname" label="닉네임" outlined required
                                        append-outer-icon="mdi-magnify"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn color="primary" block @click="checkNickname">
                                        중복 확인
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <!-- 닉네임 중복 확인 결과 -->
                            <v-alert v-if="nicknameTaken" type="error" dense>
                               이미 등록된 닉네임입니다.
                            </v-alert>

                            <!-- 가입하기 버튼 -->
                            <v-btn :disabled="!canSubmit" type="submit" color="primary" block>가입하기</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            verificationCode: "",
            codeSent: false,
            emailChecked: false,
            codeVerified: false,
            timer: 0,
            password: "",
            confirmPassword: "",
            passwordError: "",
            nickname: "",
            nicknameChecked: false,
            countdown: null,
        };
    },
    computed: {
        // 회원가입 버튼 활성화 조건
        canSubmit(){
            return this.emailChecked && !this.passwordError && this.nicknameChecked && this.password && this.confirmPassword;
        }
    },
    watch: {
        confirmPassword() {
            this.checkPassword();
        },
        password() {
            this.checkPassword();
        }
    },
    methods: {
        isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        },
        async checkEmail() {
            
            if (!this.email) {
                alert("이메일을 입력해주세요.");
                return;
            }

            if (!this.isValidEmail(this.email)) {
                alert("이메일 형식이 맞지 않습니다.");
                return; // 이메일 형식이 잘못되었으므로 API 요청을 중단합니다.
            }

            try {
                const data = await this.$store.dispatch('checkEmail', this.email);
                console.log(data);
                if (data.status === 200){
                    alert("사용 가능한 이메일입니다.");
                    this.emailChecked = true;
                }
            } catch (error){
                console.error(error);
                alert(error.response.data.errorMessage);
            }
        },
        async checkNickname() {
            const nicknamePattern = /^[a-zA-Z0-9가-힣]+$/;  // 유효한 닉네임은 영문, 숫자, 한글만 허용
            if (!this.nickname) {
                alert("닉네임을 입력해주세요.");
                return;
            }
            if (this.nickname.length > 10){
                alert("닉네임은 10자를 초과할 수 없습니다.");
                return;
            }
            if (!nicknamePattern.test(this.nickname)){
                alert("닉네임에 유효하지 않은 문자가 포함되어 있습니다. 영문, 숫자, 한글만 사용 가능합니다.");
                return;
            }

            try {
                const data = await this.$store.dispatch('checkNickname', this.nickname);
                console.log(data);
                if (data.status === 200){
                    this.nicknameChecked = true;
                    alert("사용 가능한 닉네임입니다.");
                }
            } catch (error){
                console.error(error);
                alert(error.response.data.errorMessage);
            }
        },
        checkPassword() {
            if (this.confirmPassword && this.password !== this.confirmPassword) {
                this.passwordError = "비밀번호가 일치하지 않습니다.";
            } else {
                this.passwordError = "";
            }
        },
        async sendCode() {
            try {
                if (confirm("입력한 이메일로 인증번호를 발송하시겠습니까?")){
                    this.startTimer();
                    const data = await this.$store.dispatch('sendCode', this.email);
                    if (data.status === 200){
                        this.codeSent = true;
                    }
                }
            } catch (error){
                console.error(error);
                alert("인증코드 발송 중 오류가 발생했습니다.");
            }
        },
        async verifyCode() {
            if (!this.verificationCode) {
                alert("인증코드를 입력하세요.");
                return;
            }

            try {
                const data = await this.$store.dispatch('verifyCode', this.email, this.verificationCode);
                if (data.status === 200){
                    this.codeVerified = true;
                    alert(data);
                    clearInterval(this.countdown);
                    this.emailChecked = true;
                }
            } catch (error) {
                console.error(error);
            }
        },
        startTimer() {
            this.timer = 180; // 3분 = 180초
            this.countdown = setInterval(() => {
                this.timer--;
                if (this.timer <= 0) {
                    clearInterval(this.countdown);
                    this.timer = 0;
                    this.codeSent = false;
                    alert("유효시간이 만료되었습니다. 다시 시도해주세요.");
                    window.location.reload();
                }
            }, 1000);
        },
        async handleSubmit() {
            const signUpData = {
                email: this.email,
                password: this.password,
                nickname: this.nickname,
            };

            try {
                const data = await this.$store.dispatch('signUp', signUpData);
                console.log(data);
                if (data.status === 201){
                    alert("회원가입에 성공했습니다.");
                    this.$router.push({name: 'HomeView'});
                }
            } catch (error){
                console.error(error);
                alert(error.response.data.errorMessage);
            }
        },
    },
};
</script>

<style scoped>
.signup-container {
    margin: 50px auto;
}
</style>