import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls, AppBackButton } from "#components";
import useWindowStore from "#store/window";

const TextFile = () =>{
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return(
        <section className="w-[500px] max-h-[400px] flex flex-col max-sm:w-full max-sm:max-h-none max-sm:h-full max-sm:min-h-0">
            {/* <div id="window-header">
                <WindowControls target="txtfile"/>
                <h2>{name}</h2>
            </div> */}
            <div id="window-header" className="flex items-center justify-between p-2 bg-gray-200">

                <WindowControls target="txtfile" />
                <AppBackButton currentWindow="txtfile" className="max-sm:hidden shrink-0" />

                {/* ✅ CENTERED TITLE */}
                {/* <h2 className="absolute left-1/2 -translate-x-1/2 font-medium"> */}
                <h2 className="absolute left-1/2 -translate-x-1/2 font-medium pointer-events-none">
                    {name}
                </h2>

            </div>

            {/* <div className="p-5 space-y-6 bg-white"> */}
            <div className="p-5 space-y-6 bg-white overflow-y-auto flex-1 min-h-0">
                {image ? (
                    <div className="w-full">
                        <img src={image} alt={name} className="w-full h-auto rounded"/>
                    </div>
                ): null}

                {subtitle ? <h3 className="text-lg font-semibold">{subtitle}</h3> : null}

                {/* {Array.isArray(description) && description.length > 0 ? (
                    <div className="space-y-3 leading-relaxed text-base text-gray-800">
                        {description.map((para, idx)=>(
                            <p key={idx}>{para}</p>
                        ))}
                    </div>
                ) : null} */}
                {/* ✅ SUPPORT content (for love-letter) */}
{data?.content ? (
  <pre className="whitespace-pre-wrap leading-relaxed text-sm text-gray-800 font-mono bg-gray-50 p-3 rounded-md">
    {data.content}
  </pre>
) : Array.isArray(description) && description.length > 0 ? (
  <div className="space-y-3 leading-relaxed text-base text-gray-800">
    {description.map((para, idx) => (
      <p key={idx}>{para}</p>
    ))}
  </div>
) : null}
            </div>
        </section>
    );
};

const TextWindow = WindowWrapper(TextFile, "txtfile");

export default TextWindow;