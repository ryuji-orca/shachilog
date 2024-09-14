"use client"


import { cva, type VariantProps } from "class-variance-authority"
import { LayoutGroup, motion, type MotionProps } from "framer-motion"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
  type Dispatch,
  type FC,
  type HTMLAttributes,
  type ReactNode,
  type Reducer,
  type SetStateAction,
} from "react"

import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useToast } from "../ui/use-toast"
import { Wrapper } from "../ui/wrapper"
import { cn } from "@/util/cn"

// const strictEntries = <T extends Record<string, any>>(
//   object: T,
// ): [keyof T, T[keyof T]][] => {
//   return Object.entries(object)
// }

type RadioContextType = {
  radioValue: "NFT" | "SBT"
  setRadioValue: (value: "NFT" | "SBT") => void
}

const RadioContext = createContext<RadioContextType>({
  radioValue: "NFT",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRadioValue: () => {},
})

RadioContext.displayName = "nftAndSbtRadioContext"

const RadioProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [radioValue, setRadioValue] = useState<"NFT" | "SBT">("NFT")
  return (
    <RadioContext.Provider value={{ radioValue, setRadioValue }}>
      {children}
    </RadioContext.Provider>
  )
}

const useRadio = () => {
  const context = useContext(RadioContext)
  if (context === undefined) {
    throw new Error("useRadio must be used within a RadioProvider")
  }
  return context
}

type TokenType = {
  location?: "NULL" | "WALLET1" | "WALLET2"
}

type NftType = {
  nftToken1?: TokenType
  nftToken2?: TokenType
  nftToken3?: TokenType
  nftToken4?: TokenType
}

type SbtType = {
  sbtToken1?: TokenType
  sbtToken2?: TokenType
  sbtToken3?: TokenType
  sbtToken4?: TokenType
}

type StateType = {
  nft: NftType
  sbt: SbtType
  isTransferring: {
    nullAddress?: boolean
    wallet1?: boolean
    wallet2?: boolean
  }
}

type ActionType =
  | {
      type: "NFT"
      payload: NftType
    }
  | {
      type: "SBT"
      payload: SbtType
    }
  | {
      type: "TRANSFERRING"
      payload: {
        nullAddress?: boolean
        wallet1?: boolean
        wallet2?: boolean
      }
    }

const nftAndSbtReducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case "NFT":
      return { ...state, nft: { ...state.nft, ...action.payload } }
    case "TRANSFERRING":
      return {
        ...state,
        isTransferring: { ...action.payload },
      }
    case "SBT":
      return { ...state, sbt: { ...state.sbt, ...action.payload } }
    default:
      throw new Error("Unexpected action")
  }
}

const useNftAndSbtReducer = () => {
  const { radioValue } = useRadio()
  const [state, dispatch] = useReducer(nftAndSbtReducer, {
    nft: {
      nftToken1: { location: "NULL" },
      nftToken2: { location: "NULL" },
      nftToken3: { location: "NULL" },
      nftToken4: { location: "NULL" },
    },
    sbt: {
      sbtToken1: { location: "NULL" },
      sbtToken2: { location: "NULL" },
      sbtToken3: { location: "NULL" },
      sbtToken4: { location: "NULL" },
    },
    isTransferring: {
      nullAddress: false,
      wallet1: false,
      wallet2: false,
    },
  })

  const nftOrSbtEntries = Object.entries(
    radioValue === "NFT" ? state.nft : state.sbt,
  )

  const nullLocation = nftOrSbtEntries.map(([key, value]) => {
    if (value?.location === "NULL") {
      return key
    }
  })

  const filteredNullLocation = nullLocation.filter(value => {
    return value !== undefined
  })

  const wallet1Location = nftOrSbtEntries.map(([key, value]) => {
    if (value?.location === "WALLET1") {
      return key
    }
  })

  const wallet2Location = nftOrSbtEntries.map(([key, value]) => {
    if (value?.location === "WALLET2") {
      return key
    }
  })

  const filteredWallet1Location = wallet1Location.filter(value => {
    return value !== undefined
  })

  const filteredWallet2Location = wallet2Location.filter(value => {
    return value !== undefined
  })

  const isNullAddressTransferring = state.isTransferring.nullAddress
  const isWallet1Transferring = state.isTransferring.wallet1
  const isWallet2Transferring = state.isTransferring.wallet2

  const setNftData = useCallback((newNftData: NftType) => {
    return dispatch({ type: "NFT", payload: newNftData })
  }, [])

  const setSbtData = useCallback((newSbtData: SbtType) => {
    return dispatch({ type: "SBT", payload: newSbtData })
  }, [])

  const setNftTransferring = useCallback(
    (newNftTransferring: {
      nullAddress?: boolean
      wallet1?: boolean
      wallet2?: boolean
    }) => {
      return dispatch({ type: "TRANSFERRING", payload: newNftTransferring })
    },
    [],
  )

  const resetNftLocation = useCallback(() => {
    return dispatch({
      type: "NFT",
      payload: {
        nftToken1: { location: "NULL" },
        nftToken2: { location: "NULL" },
        nftToken3: { location: "NULL" },
        nftToken4: { location: "NULL" },
      },
    })
  }, [])

  const resetSbtLocation = useCallback(() => {
    return dispatch({
      type: "SBT",
      payload: {
        sbtToken1: { location: "NULL" },
        sbtToken2: { location: "NULL" },
        sbtToken3: { location: "NULL" },
        sbtToken4: { location: "NULL" },
      },
    })
  }, [])

  return {
    ...state,
    setNftData,
    setSbtData,
    setNftTransferring,
    resetNftLocation,
    resetSbtLocation,
    nftOrSbtEntries,
    isNullAddressTransferring,
    isWallet1Transferring,
    isWallet2Transferring,
    filteredNullLocation,
    filteredWallet1Location,
    filteredWallet2Location,
  }
}

const BuyButton = ({
  handleClick,
  disabled,
}: {
  handleClick: () => void
  disabled?: boolean
}) => {
  const { nftOrSbtEntries } = useNftAndSbtReducer()
  const { radioValue } = useRadio()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {nftOrSbtEntries.map(([key, value]) => {
        if (value?.location === "NULL") {
          return (
            <motion.div
              layoutId={key}
              layout="position"
              initial={{
                opacity: 0,
                rotate: 0,
                position: "absolute",
              }}
              key={key}
              className={cn(
                "rounded-full flex items-center justify-center -z-10",
                {
                  "bg-yellow-5 dark:bg-yellowdark-5": key === "sbtToken1",
                  "bg-blue-5 dark:bg-bluedark-5": key === "sbtToken2",
                  "bg-purple-5 dark:bg-purpledark-5": key === "sbtToken3",
                  "bg-grass-5 dark:bg-grassdark-5": key === "sbtToken4",
                },
              )}
            >
              {radioValue === "NFT" ? (
                <Image
                  className="rounded-full"
                  src={`/image/sbt/${key}.png`}
                  alt={key}
                  placeholder="blur"
                  blurDataURL={`/image/sbt/${key}.png`}
                  width={48}
                  height={48}
                />
              ) : (
                <ImageIcon
                  className="text-slatedark-2 dark:text-slate-2"
                  size={24}
                />
              )}
            </motion.div>
          )
        }
      })}
      <Button
        onClick={() => {
          handleClick()
        }}
        variant="greenSolid"
        size="sm"
        disabled={disabled}
      >
        {radioValue === "NFT" ? "NFT" : "SBT"}を購入する
      </Button>
    </div>
  )
}

const walletBlockVariants = cva(
  "relative grid aspect-square size-full max-h-[240px] max-w-[240px] grid-cols-2 place-items-center items-center justify-center gap-6 rounded-lg border-2",
  {
    variants: {
      color: {
        orange: "border-orange-7 dark:border-orangedark-7",
        pink: "border-pink-7 dark:border-pinkdark-7",
      },
    },
    defaultVariants: {
      color: "orange",
    },
  },
)

type WalletBlockType = {
  title: string
  nftOrSbtEntries: [string, TokenType][]
  location: "WALLET1" | "WALLET2"
  handleClick: () => void
  isSelect?: string
  setIsSelect?: Dispatch<SetStateAction<string>>
  disabled?: boolean
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof walletBlockVariants> &
  MotionProps

const WalletBlock: FC<WalletBlockType> = ({
  title,
  color,
  location,
  isSelect,
  handleClick,
  setIsSelect,
  nftOrSbtEntries,
  disabled,
  ...props
}) => {
  const { radioValue } = useRadio()

  return (
    <div className="w-full max-w-[240px]">
      <h3 className="mt-0 text-center">{title}</h3>
      <div className={cn(walletBlockVariants({ color }))}>
        {nftOrSbtEntries.map(([key, value]) => {
          if (value?.location === location) {
            return (
              <motion.div
                layoutId={key}
                layout="position"
                key={key}
                onClick={() => {
                  if (radioValue === "SBT" && setIsSelect !== undefined) {
                    setIsSelect(key)
                  }
                }}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center aspect-square bg-indigo-3 dark:bg-indigodark-3",
                  {
                    "bg-yellow-5 dark:bg-yellowdark-5": key === "sbtToken1",
                    "bg-blue-5 dark:bg-bluedark-5": key === "sbtToken2",
                    "bg-purple-5 dark:bg-purpledark-5": key === "sbtToken3",
                    "bg-grass-5 dark:bg-grassdark-5": key === "sbtToken4",
                    "cursor-pointer w-10 h-10": radioValue === "SBT",
                    "border-2 border-blue-8 dark:border-bluedark-8":
                      radioValue === "SBT" && isSelect === key,
                  },
                )}
                {...props}
              >
                {radioValue === "NFT" ? (
                  <Image
                    className="rounded-full"
                    src={`/image/sbt/${key}.png`}
                    alt={key}
                    placeholder="blur"
                    blurDataURL={`/image/sbt/${key}.png`}
                    width={48}
                    height={48}
                  />
                ) : (
                  <ImageIcon
                    className="text-slatedark-2  dark:text-slate-2"
                    size={24}
                  />
                )}
              </motion.div>
            )
          }
        })}
      </div>

      <Button
        onClick={() => {
          handleClick()
        }}
        size="sm"
        variant="indigoSolid"
        disabled={disabled}
        className="mx-auto mt-4 flex"
      >
        移動
      </Button>
    </div>
  )
}

export const SbtAndNft = () => {
  const { radioValue, setRadioValue } = useRadio()
  const [isSelect, setIsSelect] = useState<string>("")

  const {
    isNullAddressTransferring,
    isWallet1Transferring,
    isWallet2Transferring,
    isTransferring,
    setNftData,
    setNftTransferring,
    setSbtData,
    resetNftLocation,
    resetSbtLocation,
    nftOrSbtEntries,
    filteredNullLocation,
    filteredWallet1Location,
    filteredWallet2Location,
  } = useNftAndSbtReducer()

  const handleBuyButtonClick = () => {
    setNftTransferring({ nullAddress: true })

    const [firstKey] =
      nftOrSbtEntries.find(([, value]) => {
        return value?.location === "NULL"
      }) || []

    if (firstKey === undefined) {
      return
    }

    if (radioValue === "NFT") {
      setNftData({
        [firstKey]: {
          location: "WALLET1",
        },
      })
    } else {
      setSbtData({
        [firstKey]: {
          location: "WALLET1",
        },
      })
    }
  }

  const { toast } = useToast()

  const handlewallet1ButtonClick = () => {
    const [firstKey] =
      nftOrSbtEntries.find(([, value]) => {
        return value?.location === "WALLET1"
      }) || []

    if (firstKey === undefined) {
      return
    }

    if (radioValue === "NFT") {
      setNftData({
        [firstKey]: {
          location: "WALLET2",
        },
      })
    } else {
      toast({
        title: "これはSBTです！",
        description: "SBTはウォレットから移動できません",
        variant: "destructive",
      })
    }
  }

  const handlewallet2ButtonClick = () => {
    const [firstKey] =
      nftOrSbtEntries.find(([, value]) => {
        return value?.location === "WALLET2"
      }) || []

    if (firstKey === undefined) {
      return
    }

    if (radioValue === "NFT") {
      setNftData({
        [firstKey]: {
          location: "WALLET1",
        },
      })
    } else {
      setSbtData({
        [firstKey]: {
          location: "WALLET1",
        },
      })
    }
  }

  return (
    <Wrapper>
      <div>
        <LayoutGroup>
          <div className="mb-8 grid grid-cols-1  place-items-center gap-y-8 md:mb-6 md:grid-cols-2 md:gap-y-6">
            <div className="md:col-span-3">
              <BuyButton
                handleClick={handleBuyButtonClick}
                disabled={
                  filteredNullLocation.length === 0 || isNullAddressTransferring
                }
              />
            </div>
            <WalletBlock
              title="購入用ウォレット"
              color="orange"
              location="WALLET1"
              isSelect={isSelect}
              setIsSelect={setIsSelect}
              nftOrSbtEntries={nftOrSbtEntries}
              animate={{ rotate: -360 }}
              transition={{
                ease: "easeOut",
                duration: 1,
              }}
              onLayoutAnimationStart={() => {
                setNftTransferring({
                  ...isTransferring,
                  wallet1: true,
                })
              }}
              onLayoutAnimationComplete={() => {
                if (
                  radioValue === "SBT" &&
                  filteredWallet1Location.length === 1
                ) {
                  setIsSelect("sbtToken1")
                }
                setNftTransferring({
                  nullAddress: false,
                  wallet1: false,
                })
              }}
              handleClick={handlewallet1ButtonClick}
              disabled={
                filteredWallet1Location.length === 0 ||
                isWallet1Transferring ||
                isWallet2Transferring ||
                (radioValue === "SBT" && isSelect === "")
              }
            />

            <WalletBlock
              title="保管用ウォレット"
              color="pink"
              location="WALLET2"
              nftOrSbtEntries={nftOrSbtEntries}
              animate={{ rotate: 360 }}
              transition={{
                ease: "easeOut",
                duration: 1,
              }}
              onLayoutAnimationStart={() => {
                setNftTransferring({
                  wallet2: true,
                })
              }}
              onAnimationComplete={() => {
                setNftTransferring({
                  wallet2: false,
                })
              }}
              handleClick={handlewallet2ButtonClick}
              disabled={
                filteredWallet2Location.length === 0 ||
                isWallet1Transferring ||
                isWallet2Transferring
              }
            />
          </div>
        </LayoutGroup>
      </div>

      <div>
        <RadioGroup
          className="flex items-center gap-4"
          value={radioValue}
          onValueChange={(value: "NFT" | "SBT") => {
            setRadioValue(value)
            resetNftLocation()
            resetSbtLocation()
            setIsSelect("")
          }}
          defaultValue={radioValue}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NFT" id="nft" />
            <Label htmlFor="nft">NFT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SBT" id="sbt" />
            <Label htmlFor="sbt">SBT</Label>
          </div>
        </RadioGroup>
      </div>
    </Wrapper>
  )
}

export { RadioProvider }
