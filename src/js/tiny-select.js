/**
 * tiny-select.js
 * @author Kevin From <https://github.com/kevinfrom>
 */

(function ($) {
    var methods = {
        init: function (elements) {
            addBodyEventListeners();

            /**
             * Foreach element, create a custom select and attach event listeners
             */
            $.each(elements, function () {
                var inputId = getInputId();
                $(this).after(createTinySelect(this, inputId)).css({
                    visibility: 'hidden',
                    position  : 'absolute'
                });
                addEventListeners(inputId);
            });

            /**
             * Creates a custom select
             */
            function createTinySelect(element, inputId) {
                var options    = $(element).find('option');
                var originalId = element.getAttribute('id');
                var selected   = getSelectedOptionFromSelect(element);
                var htmlClass = 'tiny-select';
                if (element.getAttribute('disabled')) {
                    htmlClass += ' disabled';
                }

                var html = '<div class="' + htmlClass + '" id="' + inputId + '" data-original-select="#' + originalId + '">';
                html += '<span>' + selected + '</span>';
                html += '<ul>';
                $.each(options, function () {
                    var value     = $(this).val();
                    var text      = $(this).text();
                    var htmlClass = selected === text ? 'class="selected"' : '';
                    html += '<li data-value="' + value + '" ' + htmlClass + '>' + text + '</li>';
                });
                html += '</ul>';
                html += '</div>';
                return html;
            }

            /**
             * Add event listeners
             */
            function addEventListeners(inputId) {
                var $input = $('#' + inputId);

                $input.click(function (e) {
                    e.stopPropagation();
                    if (!this.classList.contains('disabled')) {
                        this.classList.toggle('open');
                    }
                });

                $input.find('li').click(function () {
                    setValue(inputId, $(this).data('value'));
                    setDisplayText(inputId, $(this).text());
                });

                // Listen for select "disabled" attribute changing
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        if (mutation.type === 'attributes') {
                            if (mutation.attributeName === 'disabled') {
                                $input.toggleClass('disabled');
                            }
                        }
                    });
                });

                var originalSelectId = $input.data('original-select').substring(1);
                observer.observe(document.getElementById(originalSelectId), {
                    attributes: true
                });
            }

            /**
             * Add body event listeners
             */
            function addBodyEventListeners() {
                $('body').click(function () {
                    $('.tiny-select.open').removeClass('open');
                });
            }

            /**
             * Set value on hidden input and triggers a change
             */
            function setValue(inputId, value) {
                var originalSelectTarget = $('#' + inputId).data('original-select');
                $(originalSelectTarget).val(value).trigger('change');
            }

            /**
             * Update display text
             */
            function setDisplayText(inputId, text) {
                $('#' + inputId + ' span').text(text);
            }

            /**
             * Gets the text of the selected option, fallback to first option
             */
            function getSelectedOptionFromSelect(element) {
                var $label = $(element).find('option:selected');
                if (!$label) {
                    $label = $(element).find('option').first();
                }

                return $label.text();
            }

            /**
             * Calculates the next available id
             */
            function getInputId() {
                var inputIdPrefix = 'tiny-select';
                var id            = $('[id^=' + inputIdPrefix + ']').length + 1;

                return inputIdPrefix + '-' + id;
            }
        },
        show: function (elements) {
            $.each(elements, function () {
                var selectId = this.getAttribute('id');
                $('[data-original-select="#' + selectId + '"]').addClass('open');
            });
        },
        hide: function (elements) {
            $.each(elements, function () {
                var selectId = this.getAttribute('id');
                $('[data-original-select="#' + selectId + '"]').removeClass('open');
            });
        }
    };

    $.fn.tinySelect = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions](this)
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init(this)
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tinySelect');
        }

        return this;
    }
})(jQuery);
