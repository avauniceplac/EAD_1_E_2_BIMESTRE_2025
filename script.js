        document.addEventListener("DOMContentLoaded", function() {
            const monthTitles = document.querySelectorAll(".month-title");
            const eventItems = document.querySelectorAll(".event-item");

            // Função para calcular os dias restantes até uma data
            function getDaysUntil(dateStr) {
                const today = new Date();
                const targetDate = new Date(dateStr);
                const diffTime = targetDate - today;
                return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }

            // Verificar e aplicar estilos baseados nas datas
            eventItems.forEach(item => {
                const startDate = new Date(item.getAttribute('data-start'));
                const endDate = new Date(item.getAttribute('data-end'));
                const today = new Date();

                if (endDate < today) {
                    item.classList.add('past');
                } else if (startDate <= today && today <= endDate) {
                    const daysUntilEnd = getDaysUntil(endDate);

                    if (daysUntilEnd <= 3) {
                        item.classList.add('upcoming-3');
                    } else if (daysUntilEnd <= 7) {
                        item.classList.add('upcoming-7');
                    } else {
                        item.classList.add('upcoming');
                    }
                }

                // Exibir o mês e a lista de eventos se algum evento for encontrado
                const eventList = item.parentNode;
                const monthCategory = eventList.parentNode; // .month-category
                monthCategory.querySelector(".event-list").style.display = "block";
                monthCategory.style.display = "block";
            });

            // Event listener para os meses
            monthTitles.forEach(function(title) {
                title.addEventListener("click", function() {
                    const eventList = this.nextElementSibling;
                    eventList.style.display = (eventList.style.display === "none" || eventList.style.display === "") ? "block" : "none";
                });
            });
        });