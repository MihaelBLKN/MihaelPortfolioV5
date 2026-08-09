<script setup lang="ts">
import { reactive, ref } from "vue";
import { contactForm, profile } from "../data/content";
import { useI18n } from "../i18n";

const { content } = useI18n();

type Status = "idle" | "submitting" | "success" | "error";

const form = reactive({ name: "", email: "", message: "" });
const status = ref<Status>("idle");
const errorMessage = ref("");

async function handleSubmit() {
  status.value = "submitting";
  errorMessage.value = "";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: contactForm.web3FormsAccessKey,
        subject: `New portfolio message from ${form.name}`,
        name: form.name,
        email: form.email,
        message: form.message,
        botcheck: false,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      status.value = "success";
      form.name = "";
      form.email = "";
      form.message = "";
    } else {
      status.value = "error";
      errorMessage.value = result.message || content.value.contact.errorGeneric;
    }
  } catch {
    status.value = "error";
    errorMessage.value = content.value.contact.errorNetwork;
  }
}
</script>

<template>
  <section id="contact" class="py-24 md:py-32">
    <div class="mx-auto max-w-2xl px-6 text-center">
      <h2 v-reveal class="font-display text-3xl font-semibold leading-tight text-bone md:text-5xl">
        {{ content.contact.heading }}
      </h2>
      <p v-reveal="80" class="mx-auto mt-5 max-w-[46ch] text-base leading-relaxed text-bone-dim">
        {{ content.contact.subheading }}
      </p>

      <form
        v-if="status !== 'success'"
        v-reveal="140"
        class="mt-10 space-y-4 text-left"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="contact-name" class="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {{ content.contact.nameLabel }}
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              required
              :disabled="status === 'submitting'"
              class="w-full rounded-xl border border-line bg-surface-2/60 px-4 py-3 text-sm text-bone placeholder:text-muted outline-none transition-colors focus:border-bone-dim disabled:opacity-60"
              :placeholder="content.contact.namePlaceholder"
            />
          </div>
          <div>
            <label for="contact-email" class="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {{ content.contact.emailLabel }}
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              required
              :disabled="status === 'submitting'"
              class="w-full rounded-xl border border-line bg-surface-2/60 px-4 py-3 text-sm text-bone placeholder:text-muted outline-none transition-colors focus:border-bone-dim disabled:opacity-60"
              :placeholder="content.contact.emailPlaceholder"
            />
          </div>
        </div>

        <div>
          <label for="contact-message" class="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {{ content.contact.messageLabel }}
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            name="message"
            rows="5"
            required
            :disabled="status === 'submitting'"
            class="w-full resize-none rounded-xl border border-line bg-surface-2/60 px-4 py-3 text-sm text-bone placeholder:text-muted outline-none transition-colors focus:border-bone-dim disabled:opacity-60"
            :placeholder="content.contact.messagePlaceholder"
          />
        </div>

        <p v-if="status === 'error'" class="text-sm text-red-400">
          {{ errorMessage }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="submit"
            :disabled="status === 'submitting'"
            class="inline-flex items-center rounded-full bg-amber px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:bg-amber-dim active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ status === "submitting" ? content.contact.sendingButton : content.contact.sendButton }}
          </button>
          <a
            :href="profile.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-full border border-line px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:border-bone-dim active:scale-[0.97]"
          >
            {{ content.contact.connectLinkedin }}
          </a>
        </div>

        <p class="pt-1 text-center text-xs text-muted">
          {{ content.contact.preferEmail }}
          <a :href="`mailto:${profile.email}`" class="underline decoration-line/60 hover:text-bone-dim">
            {{ profile.email }}
          </a>
        </p>
      </form>

      <div v-else class="mt-10 rounded-2xl border border-line bg-surface-2/60 px-6 py-10">
        <p class="text-base text-bone">{{ content.contact.successTitle }}</p>
        <p class="mt-2 text-sm text-bone-dim">{{ content.contact.successSubtitle }}</p>
      </div>
    </div>
  </section>
</template>
