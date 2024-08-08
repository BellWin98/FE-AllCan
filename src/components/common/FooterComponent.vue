<template>
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2024 My Board</p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #174a7a;
    color: white;
    padding: 1em 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    bottom: 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
}

.footer-nav {
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.footer-link {
    color: white;
    text-decoration: none;
    margin-left: 1.5em;
}

.footer-link:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
    }

    .footer-nav {
        flex-direction: column;
        align-items: center;
        margin-top: 1em;
    }

    .footer-link {
        margin-left: 0;
        margin-top: 0.5em;
    }
}
</style>