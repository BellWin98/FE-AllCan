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
                                    <v-btn :disabled="emailChecked || timer > 0" color="primary" block
                                        @click="checkEmail">
                                        이메일 중복 확인
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <!-- 이메일 인증코드 전송 및 검증 필드 -->
                            <v-row v-if="emailChecked">
                                <v-col cols="8">
                                    <v-text-field v-model="verificationCode" label="인증 코드" outlined required
                                        append-outer-icon="mdi-check" :disabled="!codeSent"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn :disabled="timer > 0" color="primary" block @click="sendVerificationCode">
                                        인증코드 전송
                                        <span v-if="timer > 0">({{ timer }}s)</span>
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <!-- 이메일 인증 버튼 -->
                            <v-btn v-if="codeSent" color="success" block class="mb-4" @click="verifyCode">
                                이메일 인증
                            </v-btn>

                            <!-- 비밀번호 입력 필드 -->
                            <v-text-field v-model="password" label="비밀번호" type="password" outlined
                                required></v-text-field>

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
                            <v-btn type="submit" color="primary" block>가입하기</v-btn>
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
            timer: 0,
            password: "",
            nickname: "",
            nicknameTaken: false,
            countdown: null,
        };
    },
    methods: {
        isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        },
        async checkEmail() {

            if (!this.isValidEmail(this.email)) {
                alert("이메일 형식이 맞지 않습니다.");
                return; // 이메일 형식이 잘못되었으므로 API 요청을 중단합니다.
            }
            try {
                const data = await this.$store.dispatch('checkEmail', this.email);
                console.log(data);
                if (data.status === 200){
                    this.emailChecked = true;
                    alert("사용 가능한 이메일입니다.");
                }
            } catch (error){
                console.error(error);
                alert(error.response.data.error.message);
            }
        },
        async sendVerificationCode() {
            try {
                if (confirm("입력한 이메일로 인증번호를 발송하시겠습니까?")){
                    this.startTimer();
                    const data = await this.$store.dispatch('sendVerificationCode', this.email);
                    if (data.status === 200){
                        this.codeSent = true;
                    }
                }
            } catch (error){
                console.error(error);
                alert("인증코드 발송 중 오류가 발생했습니다.");
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
        verifyCode() {
            // 인증 코드를 검증하는 로직을 구현합니다.
        },
        checkNickname() {
            // 닉네임 중복 확인 로직을 구현합니다.
            // 예시: this.nicknameTaken = true; // 닉네임이 이미 존재하는 경우
        },
        handleSubmit() {
            // 회원가입 폼 제출 로직을 구현합니다.
        },
    },
};
</script>

<style scoped>
.signup-container {
    margin: 50px auto;
}
</style>