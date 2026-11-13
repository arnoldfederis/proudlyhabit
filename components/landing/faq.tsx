import { FadeIn } from "@/components/common/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HOME_FAQ_ITEMS } from "@/lib/seo";

export function FAQ() {
  return (
    <section className="border-t bg-muted/30 py-24" id="faq">
      <div className="mx-auto max-w-3xl">
        <FadeIn className="mb-14 px-6 text-center">
          <h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Quick answers about Proudly.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Accordion className="border-0 px-2 md:px-0">
            {HOME_FAQ_ITEMS.map(({ question, answer }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger className="cursor-pointer">
                  {question}
                </AccordionTrigger>
                <AccordionContent>
                  <p>{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
