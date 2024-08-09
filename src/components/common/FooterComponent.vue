<template>
    <v-footer app color="primary" dark>
        <v-row class="footer-content" align="center" justify="center">
            <v-col class="text-center">
                <p>&copy; 2024 My Board</p>
            </v-col>
        </v-row>
    </v-footer>
</template>

<style scoped>
.footer-content {
    width: 100%;
    max-width: 1200px;
}

p {
    margin: 0;
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        text-align: center;
    }
}
</style>